import pandas as pd
import re 

def clean_string(string):
    if pd.isna(string):
        return None
    return re.sub(
        r"\s\s+",
        " ",
        string.strip()
    ).strip()

def clean_string_remove_nonalpha(string):
    if pd.isna(string):
        return None
    return re.sub(
        r"\s\s+",
        " ",
        re.sub(
            r"[^A-Za-z0-9]", 
            " ", 
            string.strip()
        )
    ).strip()

def filter_to_known_parcels(df, parcel_df):
    return df.merge(parcel_df[['parcel']].drop_duplicates(), on='parcel').copy()

def try_cast_to_int(string):
    try:
        return int(string.strip())
    except ValueError:
        return None
    
def adjust_shortened_address_range(start, end):
    start = str(start)
    end = str(end)

    # Handle formats like '10002-4'
    to_add = start[: -len(end)]
    end_adj = int(to_add + end)
    if end_adj > int(start):
        return end_adj
    
    # If we couldn't find an adjusted endpoint that is
    # greater than the start point, give up and return
    # the starting point
    return int(start)

def addr_to_min_max(string):
    SEPARATORS = ['-', '&', 'to', ',']

    # Handle addresses like '100-102'
    string = str(string).lower()
    for sep in SEPARATORS:
        if string.count(sep) == 1:
            start, end = string.split(sep)

            start = try_cast_to_int(start)
            end = try_cast_to_int(end)

            if start and end and end < start:
                return start, adjust_shortened_address_range(start, end)

            return start, end

    # Likely only a single number or an invalid number.
    integer = try_cast_to_int(string)
    return integer, integer

def addr_to_min(string):
    addr_min, _ = addr_to_min_max(string)
    return addr_min

def addr_to_max(string):
    _, addr_max = addr_to_min_max(string)
    return addr_max

# PARCELS ----------------------------------------------------------------------

print('parcels')

REMAP_SUFFIX = {
    'ROW': 'ROW',
    'TER': 'TERRACE',
    'SQ': 'SQUARE',
    'PK': 'PARKWAY',
    'PKWAY': 'PARKWAY',
    'CIR': 'CIRCLE',
    'PKWY': 'PARKWAY',
    'LN': 'LANE',
    'PL': 'PLACE',
    'CT': 'COURT',
    'BLVD': 'BOULEVARD',
    'DR': 'DRIVE',
    'RD': 'ROAD',
    'ST': 'STREET',
    'AVE': 'AVENUE',
    'BLV': 'BOULEVARD',
    'BVD': 'BOULEVARD',
    'AVE.': 'AVENUE',
}

parcels = pd.read_json('source/parcels.json')
parcels.columns = [x.lower().strip() for x in parcels.columns]

parcels = parcels[~parcels.par_addr_all.isna()].rename(columns={'parcelpin': 'parcel'})

parcels['owner_clean'] = parcels['std_deeded_owner'].apply(clean_string_remove_nonalpha)

PARCELS_SIMPLE_CLEAN = [
    'parcel_predir',
    'parcel_street',
    'parcel_suffix',
    'parcel_unit',
]
for col_name in PARCELS_SIMPLE_CLEAN:
    parcels[col_name] = parcels[col_name].apply(clean_string)

parcels['parcel_suffix'] = parcels['parcel_suffix'].apply(lambda x: REMAP_SUFFIX.get(x, x))

parcels['parcel_addr_min'] = parcels['parcel_addr'].apply(lambda x: addr_to_min(x))
parcels['parcel_addr_max'] = parcels['parcel_addr'].apply(lambda x: addr_to_max(x))

parcels = parcels.drop('parcel_addr', axis=1)

parcels = parcels.copy()

# CIVIL TICKETS ----------------------------------------------------------------------

print('civil tickets')
civil_tickets = pd.read_json('source/civil_tickets.json')
civil_tickets.columns = [x.lower().strip() for x in civil_tickets.columns]

civil_tickets = civil_tickets.rename(columns={'dw_parcel': 'parcel'})
civil_tickets = civil_tickets[~civil_tickets.parcel.isna()]

civil_tickets = filter_to_known_parcels(civil_tickets, parcels)

civil_tickets[[
    'ticket_id',
    'file_date',
    'ticket_status',
    'ticket_status_date',
    'issue_date',
    'additional_citation_details',
    'parcel',
]].to_csv('transformed/civil_tickets.csv', index=False)

civil_tickets_agg = (civil_tickets
    .groupby('parcel')
    .size()
    .reset_index()
    .rename(columns={0: 'civil_tickets'})
)

parcels = parcels.merge(civil_tickets_agg, on='parcel', how='left')


# COMPLAINTS (HEALTH) ----------------------------------------------------------------------

print('health complaints')

complaints_health = pd.read_json('source/complaints_health.json')
complaints_health.columns = [x.lower().strip() for x in complaints_health.columns]

complaints_health = complaints_health.rename(columns={'dw_parcel': 'parcel'})

complaints_health = filter_to_known_parcels(complaints_health, parcels)

complaints_health[[
    'objectid',
    'id',
    'complaint_number',
    'submit_date',
    'complaint_type',
    'complaint_input',
    'complaint_inspector',
    'complaint_status',
    'complaint_outcome',
    'food_complaint',
    'farm_animal',
    'insect_vermin',
    'odor_type',
    'odor_strength',
    'problem_location_name',
    'parcel',
]].to_csv('transformed/complaints_health.csv', index=False)

complaints_health_agg = (complaints_health
    .groupby('parcel')
    .size()
    .reset_index()
    .rename(columns={0: 'complaints_health'})
)
parcels = parcels.merge(complaints_health_agg, on='parcel', how='left')


# VIOLATIONS ----------------------------------------------------------------------

print('violations')

complaint_violations = pd.read_json('source/complaint_violations.json')
complaint_violations.columns = [x.lower().strip() for x in complaint_violations.columns]

complaint_violations = (complaint_violations
    [['violation_number', 'record_id']]
    .rename(columns={
        'record_id': 'complaint_id',
        'violation_number': 'record_id',
    })
    .drop_duplicates('record_id')
)

violation_status_history = pd.read_json('source/violation_status_history.json')
violation_status_history.columns = [x.lower().strip() for x in violation_status_history.columns]

violation_status_history = violation_status_history[~violation_status_history.task_status.isna()]
violation_status_history['task_status'] = violation_status_history['task_status'].apply(lambda x: x.strip())
violation_status_history = violation_status_history[violation_status_history.task_status == 'VN Created/Mailed']

violation_status_history = (violation_status_history
    [[
        'record_id', 
        'dw_parcel',
        'type_of_violation',
        'occupancy_or_use',
        'issue_date',
        'accela_citizen_access_url',
    ]]
    .sort_values(['record_id', 'dw_parcel'])
    .drop_duplicates('record_id')
    .rename(columns={'dw_parcel': 'parcel'})
    .merge(complaint_violations, on='record_id', how='left')
)

violation_status_history = filter_to_known_parcels(violation_status_history, parcels)

violation_status_history.to_csv('transformed/code_violations.csv', index=False)

violations_agg = (violation_status_history
    .groupby('parcel')
    .size()
    .reset_index()
    .rename(columns={0: 'code_violations'})
)

parcels = parcels.merge(violations_agg, on='parcel', how='left')


# COMPLAINTS (311) ----------------------------------------------------------------------

print('311 complaints')

complaints_311 = pd.read_json('source/complaints_311.json')
complaints_311.columns = ['_'.join(x.lower().strip().split()) for x in complaints_311.columns]

complaints_311 = complaints_311.rename(columns={'parcelpin': 'parcel'})
complaints_311 = complaints_311[~complaints_311.parcel.isna()]
complaints_311 = complaints_311[complaints_311.agency_responsible == 'Building & Housing']
complaints_311 = complaints_311[[
    'service_request_id',
    'service_name',
    'status_description',
    'requested_datetime',
    'closed_date',
    'source',
    'target_date',
    'parcel',
]]

complaints_311 = filter_to_known_parcels(complaints_311, parcels)

complaints_311.to_csv('transformed/complaints_311.csv', index=False)

complaints_311_agg = (complaints_311
    .groupby('parcel')
    .size()
    .reset_index()
    .rename(columns={0: 'complaints_311'})
)
parcels = parcels.merge(complaints_311_agg, on='parcel', how='left')


# WRITE PARCELS ----------------------------------------------------------------------

metrics = [
    'code_violations', 
    'complaints_health', 
    'civil_tickets',
    'complaints_311',
]

parcels[metrics] = parcels[metrics].fillna(value=0)

parcels.to_csv('transformed/parcels.csv', index=False)
