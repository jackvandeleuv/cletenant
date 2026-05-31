import requests
import json 

def get_params(offset, outfields='*'):
    if type(outfields) == str:
        outfields = ','.join(outfields)
    return {
        'resultRecordCount': 1000,
        'resultOffset': offset,
        'where': '1=1',
        'outFields': outfields,
        'outSR': '4326',
        'f': 'json',
        'returnGeometry': False,
    }

def get_data(url, outfields='*'):
    LIMIT = 1000
    offset = 0
    data = []
    first = True

    while first or ('exceededTransferLimit' in resp_json and resp_json['exceededTransferLimit']):
        first = False

        r = requests.get(url, params=get_params(offset, outfields))
        r.raise_for_status()

        resp_json = r.json()

        for row in resp_json['features']:
            data.append(row['attributes'])

        offset += LIMIT
        # print(offset)

    return data

def ingest_service(url, file_name, outfields='*'):
    path = f'source/{file_name}.json'
    data = get_data(url, outfields)
    with open(path, 'wt', encoding='utf-8') as file:
        file.write(json.dumps(data))
    

SERVICES = [
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/Civil_Tickets/FeatureServer/0/query',
        'civil_tickets',
    ),
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/Violation_Status_History/FeatureServer/0/query',
        'violation_status_history',
    ),
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/Complaint_Violation_Notices/FeatureServer/0/query',
        'complaint_violations',
    ),
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/Data_311/FeatureServer/0/query',
        'complaints_311'
    ),
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/CDPH_Complaints/FeatureServer/0/query',
        'complaints_health'
    ),
    (
        'https://services3.arcgis.com/dty2kHktVXHrqO8i/arcgis/rest/services/Parcel_Analytics_(PUBLIC_DRAFT_)/FeatureServer/0/query',
        'parcels',
        [
            'parcelpin', 
            'par_addr_all',
            'parcel_addr', 
            'parcel_predir', 
            'parcel_street', 
            'parcel_suffix', 
            'parcel_unit', 
            # 'parcel_city', 
            # 'parcel_zip',
            'parcel_owner', 
            'std_deeded_owner', 
            'grantor', 
            'grantee',
            'last_transfer_date',
            'tax_assessed_total',
            'activerentalregistrationflag',
            'activecertificateapprovingrentaloccupancyflag',
            'leadsafecertificateactiveflag',
            'transfers_in_5y',
            'myplacelink',
            'survey2022_grade',
            'survey2022_photolink',
            'taxdelinquencyamount',
            'max_age',
            'min_age',
            'min_com_age',
            'max_com_age',
        ],
    )
]

for service in SERVICES:
    print('Ingesting:', service[1])
    ingest_service(*service)
