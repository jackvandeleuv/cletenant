from flask import Flask, request
from markupsafe import escape
import pandas as pd 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

parcels = pd.read_csv('../scratch/transformed/parcels.csv')
owners = pd.read_csv('../scratch/transformed/owner_summary.csv')

@app.route("/parcel")
def parcel():
    parcelpin = request.args.get("parcelpin")
    parcelpin = escape(parcelpin).upper().strip()

    sub = parcels[parcels.parcel == parcelpin]

    if len(sub) == 0:
        return 'did not recognize parcelpin', 404

    return sub[: 1].to_json(orient='records')

@app.route("/owner")
def owner():
    name = request.args.get("name")
    name = escape(name).upper().strip()

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
