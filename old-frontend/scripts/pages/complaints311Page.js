import { getComplaints311, getViolations } from "../fetchData.js";
import { convertDateObjectToLabel, updateContentWrapper } from "../utilities.js";
import { getParcelPageParcelState } from "./parcelPage.js";

const complaintCard = (complaint) => {
    const requestedTime = convertDateObjectToLabel(new Date(complaint.requested_datetime));
    const otherTime = complaint.closed_date ? convertDateObjectToLabel(new Date(complaint.closed_date)) : convertDateObjectToLabel(new Date(complaint.target_date));
    const otherLabel = complaint.closed_date ? 'Closed' : 'Target';
    return `
        <div class="recordCard">
            <div class="recordCardInnerWrapper">
                <div class="recordCardHeaderWrapper">
                        <svg class="recordCardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/>
                        </svg>
                        <div class="recordCardHeader">
                        <h4>311 Complaint</h4>
                        <h1 class="recordCardValue">${complaint.reference_number}</h1>
                    </div>
                </div>
                <div class="recordCardComplaintSubHeader">
                    <p>Type: ${complaint.service_name}</p>
                    <div class="statusDescriptionWrapper">
                        <p>Status: ${complaint.status_description}</p>
                    </div>
                </div>
                <div class="recordCardSubHeader">
                    <p>Created: ${requestedTime}</p>
                    <p>${otherLabel}: ${otherTime}</p>
                </div>
            </div>
        </div>
    `;
}

const complaintsPage = () => {
    const violations = getComplaintsState();
    console.log(violations)
    const recordCardsElem = violations
        .map((row) => complaintCard(row))
        .join('\n');

    return `
        <div id="recordPageHeader">
            <h1 id="recordPageHeaderCount">
                Total 311 Complaints: ${violations.length}
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

export async function renderComplaints311Page() {
    const parcel = getParcelPageParcelState();
    const parcelpin = parcel.parcel;
    const complaints = await getComplaints311(parcelpin);

    for (let i = 0; i < complaints.length; i++) {
        complaints[i].requested_datetime = new Date(complaints[i].requested_datetime);
    }
    complaints.sort((a, b) => b.requested_datetime.getTime() - a.requested_datetime.getTime());

    setComplaintsState(complaints);
    updateContentWrapper(complaintsPage());
}

function getComplaintsState() {
    return structuredClone(_complaints);
}

function setComplaintsState(update) {
    _complaints = structuredClone(update);
}

let _complaints = null;