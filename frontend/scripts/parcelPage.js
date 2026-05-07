export function renderParcelPage() {
    console.log(parcel)
    document.getElementById('searchWrapper').innerHTML = parcelPage(parcel);
}

const parcelPage = (parcel) => {
    return `
        <div class="cardWrapper">
            <div class="card">
                <h2>Violations</h2>
                <h2 class="cardValue">${parcel.code_violations}</h2>
            </div>

            <div class="card">
                <h2>Civil Tickets</h2>
                <h2 class="cardValue">${parcel.civil_tickets}</h2>
            </div>

        </div>
    `;
}

export function setParcelPageParcel(update) {
    parcel = structuredClone(update);
}

let parcel = null;