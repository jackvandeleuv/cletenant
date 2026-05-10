import { getOwner, getParcel, getSuggestions } from "../fetchData.js";
import { renderOwnerPage, setOwnerPageOwner } from "./ownerPage.js";
import { renderParcelPage, setParcelPageParcelState } from "./parcelPage.js";
import { renderViolationsPage } from "./violationsPage.js";

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
            setParcelPageParcelState(parcel[0]);
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
    _suggestions = structuredClone(update);
}

function getSearchPageSuggestions() {
    return structuredClone(_suggestions);
}

let _suggestions = [];