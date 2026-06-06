import { BACKEND_URL, CLIENT_SAFE_KEY } from "./config.js";
import { sleep } from "./utilities.js";

const OWNER_COLS = [
    'std_deeded_owner',
    'activerentalregistrationflag',
    'activecertificateapprovingrentaloccupancyflag',
    'leadsafecertificateactiveflag',
    'taxdelinquencyamount',
    'transfers_in_5y',
    'civil_tickets',
    'complaints_health',
    'code_violations',
    'complaints_311',
    'survey2022_grade_num',
    'parcels_owned',
];

async function lookupRecord(endpoint, key, value, exactMatch, limit) {
    const DEFAULT_LIMIT = 999;

    const url = new URL(`${BACKEND_URL}/${endpoint}`);

    const maxRange = limit || DEFAULT_LIMIT;
    const matchType = exactMatch || exactMatch === undefined ? 'eq' : 'ilike';
    const query = exactMatch || exactMatch === undefined ? value : `*${value}*`;

    let select = '*';
    if (endpoint === 'parcels') {
        select = select + `,owners(${OWNER_COLS.join(',')})`;
    }

    url.searchParams.set("select", select);
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

async function lookupRecordWithAddress(endpoint, input, address, limit) {
    const DEFAULT_LIMIT = 999;

    const url = new URL(`${BACKEND_URL}/${endpoint}`);

    const maxRange = limit || DEFAULT_LIMIT;

    url.searchParams.set("select", "*");

    if (address.streetNumber && address.streetNumber !== '') {
        url.searchParams.set("parcel_addr_max", `gte.${address.streetNumber}`);
        url.searchParams.set("parcel_addr_min", `lte.${address.streetNumber}`);
    }
    if (address.streetDir && address.streetDir !== '') {
        url.searchParams.set("parcel_predir", `eq.${address.streetDir}`);
    }
    if (address.streetName && address.streetName !== '') {
        url.searchParams.set("parcel_street", `like.${address.streetName}*`);  
    }
    if (address.streetType && address.streetType !== '') {
        url.searchParams.set("parcel_suffix", `eq.${address.streetType}`);  
    }

    if (
        address.streetNumber === '' &&
        address.streetDir === '' &&
        address.streetName === '' &&
        address.streetName === ''
    ) {
        url.searchParams.set('par_addr_all', `like.${input.trim()}*`);  
    }

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

export async function getSuggestionsByAddress(input, address) {
    // await sleep(100000);
    return await lookupRecordWithAddress('parcels', input, address, 100);
}

// export async function getSuggestions(q) {
//     return await lookupRecord('parcels', 'par_addr_all', q, false, 5);
// }

export async function getParcel(parcelpin) {
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