import os
import pandas as pd 
import json 
import requests 
from requests import HTTPError
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get('SERVICE_ROLE_KEY')
if not key:
    raise ValueError('API key env var missing!')

def cast_num_cols_to_int(df, excluded):
    print('Casting numeric cols...')
    for col in df.select_dtypes(include='number').columns:
        if col in excluded:
            continue
        df[col] = df[col].astype("Int64")
    return df

def post(url, json_data: str):
    HEADERS = {
        'apikey': key,
        'Authorization': f'Bearer {key}',
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
    }

    r = requests.post(
        url,
        headers=HEADERS,
        json=json_data,
    )
    # print(r.text)
    try:
        r.raise_for_status()
    except HTTPError as e:
        print(r.text)
        raise e

URLS = {
    'owners.csv': (
        'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/owners',
        [
            'taxdelinquencyamount',
            'survey2022_grade_num',
        ],
    ),
    'parcels.csv': (
        'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/parcels',
        [
            'tax_assessed_total',
            'taxdelinquencyamount',
        ],
    ),
    # 'civil_tickets.csv': (
    #     'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/civil_tickets',
    #     [],
    # ),
    # 'code_violations.csv': (
    #     'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/code_violations',
    #     [],
    # ),
    # 'complaints_311.csv': (
    #     'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/complaints_311',
    #     [],
    # ),
    # 'complaints_health.csv': (
    #     'https://kvzikdxyxvziagomfvii.supabase.co/rest/v1/complaints_health',
    #     [],
    # ),
}

LIMIT = 1000

for file_name, (url, excluded_cols) in URLS.items():
    print(file_name)
    df = pd.read_csv(f"transformed/{file_name}", low_memory=False)
    df = cast_num_cols_to_int(df, excluded_cols)
    print(f'sending {len(df)} rows')
    df = json.loads(df.to_json(orient='records'))
    start = 0
    end = LIMIT 
    while start < len(df):
        print(start, end)
        post(
            url, 
            df[start : end]
        )
        start += LIMIT
        end += LIMIT
        