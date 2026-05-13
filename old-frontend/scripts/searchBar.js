import { getParcel, getSuggestions } from "./fetchData.js";
import { getCurrentPage, pageIDToDisplayName, setAndRenderCurrentPage } from "./main.js";
import { getParcelPageParcelState, renderParcelPage, setParcelPageParcelState } from "./pages/parcelPage.js";
import { renderViolationsPage } from "./pages/violationsPage.js";

export function renderSearchPage() {
    addSearchInputListener();
    addPageSelectorWrapperListener();
    addPageSelectorButtonListeners();
}

export function insertParcelIntoSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const parcel = getParcelPageParcelState();
    console.log('search bar parcel')
    console.log(parcel);
    searchBox.value = parcel.par_addr_all;
}

function addSuggestionListeners() {
    const parcelButtons = document.getElementsByClassName('parcelSuggestion');
    for (const parcelButton of parcelButtons) {
        parcelButton.addEventListener('click', (async () => {
            console.log(`click listener with: ${parcelButton.id}`);
            const parcel = await getParcel(parcelButton.id);
            setParcelPageParcelState(parcel[0]);
            toggleSuggestionDropdownVisible();
            renderParcelPage();
        }))
    }

    // const ownerButtons = document.getElementsByClassName('ownerSuggestion');
    // for (const ownerButton of ownerButtons) {
    //     ownerButton.addEventListener('click', (async () => {
    //         const owner = await getOwner(ownerButton.id);
    //         setOwnerPageOwner(owner);
    //         renderOwnerPage();
    //     }))
    // }
}

async function searchInputListener(input) {
    const results = await getSuggestions(input);
    setSearchPageSuggestions(results);
    const elems = [];
    for (const row of results) {
        elems.push(parcelSuggestion(row))
    }
    document.getElementById('suggestionBox').innerHTML = elems.join('\n');
    addSuggestionListeners();
    toggleSuggestionDropdownVisible();
}

function togglePageSelectorWrapper() {
    const buttonWrapper = document.getElementById('pageSelectorButtonWrapper');
    buttonWrapper.classList.toggle('hidden');
}

function togglePageSelectorButton(buttonID) {
    const buttonWrapper = document.getElementById(buttonID);
    buttonWrapper.classList.toggle('noDisplay');
}

function toggleSuggestionDropdownVisible() {
    console.log('toggle!');
    const suggestionBox = document.getElementById('suggestionBox');
    suggestionBox.classList.toggle('hidden');
}

function addPageSelectorWrapperListener() {
    const pageSelector = document.getElementById('pageSelector');
    pageSelector.addEventListener('click', (() => {
        togglePageSelectorWrapper();
    }));
}

function addSearchInputListener() {
    const searchBox = document.getElementById('searchBox')
    searchBox.addEventListener('input', async () => {
        searchInputListener(searchBox.value);
    });
}

function updatePageSelectorCurrentLabel(newLabel) {
    const label = document.getElementById('pageSelectorCurrentLabel');
    label.innerText = newLabel;
}

function addPageSelectorButtonListeners() {
    const buttons = document.getElementsByClassName('pageSelectorButton');
    for (const button of buttons) {
        button.addEventListener('click', (() => {
            const currentPage = getCurrentPage();
            setAndRenderCurrentPage(button.id);
            updatePageSelectorCurrentLabel(pageIDToDisplayName(button.id));
            togglePageSelectorButton(button.id);
            togglePageSelectorButton(currentPage);
            togglePageSelectorWrapper();
        }));
    }
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
            <svg class="parcelSuggestionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <div class="parcelSuggestionContent">
                <h3>${row.par_addr_all}</h3>
                <h4>Parcel ${row.parcel}</h4>
            </div>
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