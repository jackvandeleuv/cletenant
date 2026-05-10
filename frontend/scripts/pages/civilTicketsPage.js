import { getCivilTickets, getViolations } from "../fetchData.js";
import { convertDateObjectToLabel, updateContentWrapper } from "../utilities.js";
import { getParcelPageParcelState } from "./parcelPage.js";

const civilTicketCard = (ticket) => {
    const fileDate = convertDateObjectToLabel(new Date(ticket.file_date));
    const issueDate = convertDateObjectToLabel(new Date(ticket.issue_date));
    let buttonElem = '';
    if (ticket.accela_citizen_access_url) {
        buttonElem = `
            <a 
                class="acaLinkButtonWrapper"
                href="${ticket.accela_citizen_access_url}"
                target="_blank"
            >
                <svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                </svg>
                <button class="acaLinkButton">More</button>
            </a>
        `;
    }
    return `
        <div class="recordCard">
            <div class="recordCardInnerWrapper">
                <div class="recordCardHeaderWrapper">
                    <svg class="recordCardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z"/>
                    </svg>
                    <div class="recordCardHeader">
                        <h4>Civil Ticket</h4>
                        <h1 class="recordCardValue">${ticket.ticket_id}</h1>
                    </div>
                </div>
                <div class="recordCardSubHeader">
                    <p>Filed: ${fileDate}</p>
                    <p>Issued: ${issueDate}</p>
                </div>
                <p>
                    ${ticket.additional_citation_details}
                </p>
                ${buttonElem}
            </div>
        </div>
    `;
}


// additional_citation_details: "FOR SAFE OPERATION AND MAINTENANCE AND REPAIR OF ELEVATOR SERIAL #3222 & VN26002816: 159/160: ESCALATOR NOT RUNNING."
// ​
// ​
// file_date: "2026/04/02 04:00:00+00"
// ​
// ​
// issue_date: "2026/04/02 04:00:00+00"
// ​
// ​
// parcel: "10134044"
// ​
// ​
// ticket_id: "CT26003595"
// ​
// ​
// ticket_status: "Awaiting Payment"
// ​
// ​
// ticket_status_date: "2026/04/02 04:00:00+00"
const civilTicketsPage = () => {
    const civilTickets = getCivilTicketsState();
    console.log(civilTickets);
    const recordCardsElem = civilTickets
        .map((row) => civilTicketCard(row))
        .join('\n');

    return `
        <div id="recordPageHeader">
            <h1 id="recordPageHeaderCount">
                Total Civil Tickets: ${civilTickets.length}
            </h1>
            <p id="recordPageHeaderDescription">
                If violations exist, the City of Cleveland issues violation notices, giving the property owner time to make corrections.
                Click "more" to see the official records on the City's Accela Citizen Access site.
            </p>
        </div>
        <div id="recordCardWrapper">
            ${recordCardsElem}
        </div>
    `;
}

export async function renderCivilTicketsPage() {
    const parcel = getParcelPageParcelState();
    const parcelpin = parcel.parcel;
    const civilTickets = await getCivilTickets(parcelpin);

    // for (let i = 0; i < violations.length; i++) {
    //     violations[i].issue_date = new Date(violations[i].issue_date);
    // }
    // violations.sort((a, b) => b.issue_date.getTime() - a.issue_date.getTime());

    setCivilTicketsState(civilTickets);
    updateContentWrapper(civilTicketsPage());
}

function getCivilTicketsState() {
    return structuredClone(_tickets);
}

function setCivilTicketsState(update) {
    _tickets = structuredClone(update);
}

let _tickets = null;