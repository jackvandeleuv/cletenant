async function lookupRecord(endpoint, key, value) {
    const url = `http://127.0.0.1:5000/${endpoint}?${key}=${value}`;
    const resp = await fetch(url);
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