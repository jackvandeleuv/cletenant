import { BACKEND_URL, CLIENT_SAFE_KEY } from "./config.js";

async function lookupRecord(endpoint, key, value) {
    payload = {
        key: `ilike.${value}`
    }

    const url = `${BACKEND_URL}/${endpoint}"`

    const params = new URLSearchParams({
        select: '*',
        key: `ilike.${value}`, 
    });

    const resp = await fetch(
        url, 
        method='GET',
        headers={
            'Range': '0-999',
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': CLIENT_SAFE_KEY,
            'Authorization': `Bearer ${CLIENT_SAFE_KEY}`,
        },
        body=params,
    );

    return await resp.json();
}

export async function getSuggestions(q) {
    return await lookupRecord('suggestions', 'q', q);
}

export async function getParcel(parcelpin) {
    return await lookupRecord('parcel', 'parcelpin', parcelpin);
}

export async function getViolations(parcelpin) {
    return await lookupRecord('code_violations', 'parcelpin', parcelpin);
}

export async function getComplaints311(parcelpin) {
    return await lookupRecord('complaints_311', 'parcelpin', parcelpin);
}

export async function getComplaintsHealth(parcelpin) {
    return await lookupRecord('health_complaints', 'parcelpin', parcelpin);
}

export async function getCivilTickets(parcelpin) {
    return await lookupRecord('civil_tickets', 'parcelpin', parcelpin);
}

export async function getOwner(name) {
    return await lookupRecord('owner', 'name', name);
}