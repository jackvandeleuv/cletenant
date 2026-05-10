import { convertDateObjectToLabel } from "../utilities.js";

export function renderParcelPage() {
    const parcel = getParcelPageParcelState();
    console.log(parcel);
    document.getElementById('contentWrapper').innerHTML = parcelPage(parcel);
}

const parcelInfoHeaderBox = (label, value) => {
    return `
        <div class="parcelInfoHeaderBox">
            <h3>${label}</h3>
            <h2 class="parcelInfoHeaderBoxLabel">${value}</h2>
        </div>
    `;
}

const enforcementCard = (label, value) => {
    return `
        <div class="card">
            <h2>${label}</h2>
            <h2 class="cardValue">${value}</h2>
        </div>
    `;
}

const parcelPage = (parcel) => {
    const transferDate = convertDateObjectToLabel(new Date(parcel.last_transfer_date));
    const infoBoxes = [
        ['Parcel ID', parcel.parcel],
        ['Parcel Owner', parcel.parcel_owner],
        ['Last Transfer Date', transferDate],
        ['Tax Assessed Total', parcel.tax_assessed_total],
    ];
    const infoBoxesElem = infoBoxes.map((data) => parcelInfoHeaderBox(data[0], data[1])).join('\n');
    
    const enforcement = [
        ['Civil Tickets', parcel.civil_tickets],
        ['Code Violations', parcel.code_violations],
        ['311 Complaints', parcel.complaints_311],
        ['Health Complaints', parcel.health_complaints],

        ['Civil Tickets', parcel.civil_tickets],
        ['Code Violations', parcel.code_violations],
        ['311 Complaints', parcel.complaints_311],
        ['Health Complaints', parcel.health_complaints],
    ];
    const enforcementElem = enforcement.map((data) => enforcementCard(data[0], data[1])).join('\n');
    
    return `
        <div id="parcelInfoHeader">
            ${infoBoxesElem}
        </div>
        <div class="cardWrapper">
            ${enforcementElem}
        </div>
    `;
}

export function setParcelPageParcelState(update) {
    _parcel = structuredClone(update);
}

export function getParcelPageParcelState() {
    return structuredClone(_parcel)
}

let _parcel = null;