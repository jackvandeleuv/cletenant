from flask import Flask, request
from markupsafe import escape
import pandas as pd 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

parcels = pd.read_csv('../scratch/transformed/parcels.csv')
owners = pd.read_csv('../scratch/transformed/owner_summary.csv')
ct = pd.read_csv('../scratch/transformed/civil_tickets.csv')
v = pd.read_csv('../scratch/transformed/code_violations.csv')
req = pd.read_csv('../scratch/transformed/complaints_311.csv')
cdph = pd.read_csv('../scratch/transformed/health_complaints.csv')

def dataframe_to_response(parcelpin, df):
    sub = df[df.parcel == parcelpin]
    if len(sub) == 0:
        return 'did not recognize parcelpin', 404
    return sub.to_json(orient='records'), None

def get_parcelpin_param(request):
    return escape(request.args.get("parcelpin")).upper().strip()

@app.route("/code_violations")
def code_violations():
    parcelpin = get_parcelpin_param(request)
    return dataframe_to_response(parcelpin, v)
    
@app.route("/complaints_311")
def complaints_311():
    parcelpin = get_parcelpin_param(request)
    return dataframe_to_response(parcelpin, req)
    
@app.route("/health_complaints")
def health_complaints():
    parcelpin = get_parcelpin_param(request)
    return dataframe_to_response(parcelpin, cdph)
    
@app.route("/civil_tickets")
def civil_tickets():
    parcelpin = get_parcelpin_param(request)
    return dataframe_to_response(parcelpin, ct)

@app.route("/parcel")
def parcel():
    parcelpin = get_parcelpin_param(request)
    try:
        return dataframe_to_response(parcelpin, parcels)
    except ValueError as ve:
        return str(ve), 404

@app.route("/owner")
def owner():
    name = escape(request.args.get("name")).upper().strip()

    sub = owners[owners.owner_clean == name]

    if len(sub) == 0:
        return 'did not recognize owner name', 404

    return sub[: 1].to_json(orient='records')

@app.route("/suggestions")
def suggestions():
    q = request.args.get("q")
    q = escape(q).upper().strip()

    par_sub = parcels[parcels.par_addr_all.str.contains(q)][['parcel', 'par_addr_all']]
    par_sub['result_type'] = 'parcel'

    own_sub = parcels[parcels.owner_clean.str.contains(q)][['owner_clean']]
    own_sub['result_type'] = 'owner'

    if len(par_sub) == 0 and len(own_sub) == 0:
        return []
    
    if len(own_sub) == 0:
        return par_sub[: 5].to_json(orient='records')
    
    if len(par_sub) == 0:
        return own_sub[: 5].to_json(orient='records')
    
    return pd.concat([par_sub, own_sub], axis=0)[: 5].to_json(orient='records')
