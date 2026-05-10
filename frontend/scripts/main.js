import { getParcel } from "./fetchData.js";
import { renderCivilTicketsPage } from "./pages/civilTicketsPage.js";
import { renderComplaints311Page } from "./pages/complaints311Page.js";
import { renderComplaintsHealthPage } from "./pages/complaintsHealthPage.js";
import { renderParcelPage, setParcelPageParcelState } from "./pages/parcelPage.js";
import { renderSearchPage as setUpSearchBar } from "./searchBar.js";
import { renderViolationsPage } from "./pages/violationsPage.js";

function main() {
    const parcelpin = getParcelpinFromURL();
    setParcelpinState(parcelpin);

    setUpSearchBar();
    renderParcelPage();
    // test();
}

function getParcelpinFromURL() {
    const params = new URLSearchParams(window.location.search);
    const parcel = params.get("parcel");
    if (!parcel) {
        throw new Error('Could not parse parcel ID.');
    }
    return parcel;
}

export function setAndRenderCurrentPage(newPage) {
    setCurrentPage(newPage);
    renderCurrentPage();
}

function renderCurrentPage() {
    const currentPage = getCurrentPage();
    const func = PAGES.get(currentPage)[1];
    func();
}

export function pageIDToDisplayName(pageID) {
    return PAGES.get(pageID)[0];
}

export function getCurrentPage() {
    return structuredClone(_currentPage);
}

export function setCurrentPage(newPage) {
    const pages = Array.from(PAGES.keys());
    if (!pages.includes(newPage)) {
        throw new Error(`Tried to set invalid page: ${newPage}`);
    }
    _currentPage = structuredClone(newPage);
}

export function getParcelpinState() {
    return structuredClone(_parcelpin);
}

export function setParcelpinState(update) {
    _parcelpin = structuredClone(update);
}

const PAGES = new Map([
    ['parcelPage', ['Overview', renderParcelPage]],
    ['civilTicketsPage', ['Civil Tickets', renderCivilTicketsPage]],
    ['violationsPage', ['Code Violations', renderViolationsPage]],
    ['complaints311Page', ['Complaints (311)', renderComplaints311Page]],
    ['complaintsHealthPage', ['Complaints (Health)', renderComplaintsHealthPage]],
]);

let _currentPage = 'parcelPage';
let _parcelpin = null;

main();


// TESTS  ###################################################################

async function test() {
    const parcel = await getParcel("10103005");
    setParcelPageParcelState(parcel[0]);
    renderParcelPage();
    // renderViolationsPage();
    // renderCivilTicketsPage();
    // renderComplaints311Page();
    renderComplaintsHealthPage();

}
