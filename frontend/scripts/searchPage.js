import { getOwner, getParcel, getSuggestions } from "./fetchData.js";
import { renderOwnerPage, setOwnerPageOwner } from "./ownerPage.js";
import { renderParcelPage, setParcelPageParcel } from "./parcelPage.js";

export function renderSearchPage() {
    const searchBox = document.getElementById('searchBox')
    searchBox.addEventListener('input', async () => {
        searchInputListener(searchBox.value);
    });
}

function addSuggestionListeners() {
    const parcelButtons = document.getElementsByClassName('parcelSuggestion');
    for (const parcelButton of parcelButtons) {
        parcelButton.addEventListener('click', (async () => {
            const parcel = await getParcel(parcelButton.id);
            setParcelPageParcel(parcel[0]);
            renderParcelPage();
        }))
    }

    const ownerButtons = document.getElementsByClassName('ownerSuggestion');
    for (const ownerButton of ownerButtons) {
        ownerButton.addEventListener('click', (async () => {
            const owner = await getOwner(ownerButton.id);
            setOwnerPageOwner(owner);
            renderOwnerPage();
        }))
    }
}

async function searchInputListener(input) {
    const results = await getSuggestions(input);
    setSearchPageSuggestions(results);
    const elems = [];
    for (const row of results) {
        if (row.result_type === 'parcel') {
            elems.push(parcelSuggestion(row))
        } else {
            elems.push(ownerSuggestion(row))
        }
    }
    document.getElementById('suggestionBox').innerHTML = elems.join('\n');
    addSuggestionListeners();
}



const ownerSuggestion = (row) => {
    return `
        <button class="ownerSuggestion" id="${row.owner_clean}">
            ${row.owner_clean}
        </button>
    `;
}

const parcelSuggestion = (row) => {
    return `
        <button class="parcelSuggestion" id="${row.parcel}">
            ${row.par_addr_all} | ${row.parcel}
        </button>
    `;
}

function setSearchPageSuggestions(update) {
    suggestionsState = structuredClone(update);
}

function getSearchPageSuggestions() {
    return structuredClone(suggestionsState);
}

let suggestionsState = [];

// TEST
const parcel = {
  "parcel": "10103005",
  "par_addr_all": "601 LAKESIDE AVE, CLEVELAND, OH, 44114",
  "parcel_owner": "CLEVELAND CITY",
  "std_deeded_owner": "CITY OF CLEVELAND",
  "grantor": null,
  "grantee": "Cleveland City Of-City Hall",
  "owner_clean": "CITY OF CLEVELAND",
  "civil_tickets": 10,
  "health_complaints": 10,
  "code_violations": 48,
  "illegal_use_of_property_complaints": 0,
  "large_set_out_or_eviction_complaints": 0,
  "high_grass_complaints": 1,
  "no_heat_complaints": 0,
  "no_permit_complaints": 0,
  "rental_inspection_complaints": 0,
  "vacant_property_complaints": 1,
  "exterior_maintenance_complaints": 5
}

setParcelPageParcel(parcel);
renderParcelPage();