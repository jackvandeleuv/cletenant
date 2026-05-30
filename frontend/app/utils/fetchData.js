import { BACKEND_URL, CLIENT_SAFE_KEY } from "./config.js";

async function lookupRecord(endpoint, key, value, exactMatch, limit) {
    const DEFAULT_LIMIT = 999;

    const url = new URL(`${BACKEND_URL}/${endpoint}`);

    const maxRange = limit === undefined ? DEFAULT_LIMIT : limit;
    const matchType = exactMatch || exactMatch === undefined ? 'eq' : 'ilike';
    const query = exactMatch || exactMatch === undefined ? value : `*${value}*`;

    url.searchParams.set("select", "*");
    url.searchParams.set(key, `${matchType}.${query}`);

    if (limit) {
        url.searchParams.set('limit', limit);
    }

    const resp = await fetch(
        url, 
        {
            method: 'GET',
            headers: {
                'Range': `0-${maxRange}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'apikey': CLIENT_SAFE_KEY,
                'Authorization': `Bearer ${CLIENT_SAFE_KEY}`,
            },
        }
    );

    if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
    }

    return await resp.json();
}

export async function getSuggestions(q) {
    return await lookupRecord('parcels', 'par_addr_all', q, false, 5);
}

export async function getParcel(parcelpin) {
    console.log(`looking up ${parcelpin}`)
    return await lookupRecord('parcels', 'parcel', parcelpin);
}

export async function getViolations(parcelpin) {
    return await lookupRecord('code_violations', 'parcel', parcelpin);
}

export async function getComplaints311(parcelpin) {
    return await lookupRecord('complaints_311', 'parcel', parcelpin);
}

export async function getComplaintsHealth(parcelpin) {
    return await lookupRecord('complaints_health', 'parcel', parcelpin);
}

export async function getCivilTickets(parcelpin) {
    return await lookupRecord('civil_tickets', 'parcel', parcelpin);
}

// export async function getOwner(name) {
//     return await lookupRecord('owner', 'name', name);
// }