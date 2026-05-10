import { getComplaintsHealth } from "../fetchData.js";
import { convertDateObjectToLabel, updateContentWrapper } from "../utilities.js";
import { getParcelPageParcelState } from "./parcelPage.js";


const tagElem = (tag_name, tag_value, color) => {
    return `
        <p class="healthTag" style="background-color: ${color}">
            ${tag_name}: ${tag_value}
        </p>
    `;
}

const tagBox = (complaint) => {
    const COLS = [
        ['complaint_type', 'Type', 'oklch(90.1% 0.076 70.697)'],  // orange-200
        ['farm_animal', 'Farm Animal', 'oklch(93.8% 0.127 124.321)'],  // lime-200
        ['insect_vermin', 'Insect/Vermin', 'oklch(91.7% 0.08 205.041)'],  // cyan-200
        ['odor_strength', 'Odor Strength', 'oklch(87% 0.065 274.039)'],  // indigo-200
        ['odor_type', 'Odor Type', 'oklch(89.2% 0.058 10.001)'],  // rose-200
    ];
    const tags = [];
    for (const colSpec of COLS) {
        if (complaint[colSpec[0]]) {
            tags.push(tagElem(colSpec[1], complaint[colSpec[0]], colSpec[2]));
        }
    }
    return `
        <div class="recordCardTagBox">
            ${tags.join('\n')}
        </div>
    `;
}

const complaintCard = (complaint) => {
    const issueDate = convertDateObjectToLabel(complaint.submit_date);
    let outcomeElem = '';
    if (complaint.complaint_outcome) {
        outcomeElem = `
            <div class="recordCardSubHeader">
                <p>Outcome: ${complaint.complaint_outcome}</p>
            </div>
        `;
    }
    return `
        <div class="recordCard">
            <div class="recordCardInnerWrapper">
                <div class="recordCardHeaderWrapper">
                        <svg class="recordCardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
                        </svg>
                        <div class="recordCardHeader">
                        <h4>Health Complaint</h4>
                        <h1 class="recordCardValue">${complaint.complaint_number}</h1>
                    </div>
                </div>
                <div class="recordCardSubHeader">
                    <p>Status: ${complaint.complaint_status}</p>
                    <p>Created: ${issueDate}</p>
                </div>
                ${outcomeElem}
                ${tagBox(complaint)}
            </div>
        </div>
    `;
}

const violationPage = () => {
    const violations = getViolationState();
    console.log(violations)
    const recordCardsElem = violations
        .map((row) => complaintCard(row))
        .join('\n');

    return `
        <div id="recordPageHeader">
            <h1 id="recordPageHeaderCount">
                Total Health Complaints: ${violations.length}
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

export async function renderComplaintsHealthPage() {
    const parcel = getParcelPageParcelState();
    const parcelpin = parcel.parcel;
    const violations = await getComplaintsHealth(parcelpin);

    for (let i = 0; i < violations.length; i++) {
        violations[i].submit_date = new Date(violations[i].submit_date);
    }
    violations.sort((a, b) => b.submit_date.getTime() - a.submit_date.getTime());

    setViolationState(violations);
    updateContentWrapper(violationPage());
}

function getViolationState() {
    return structuredClone(_violations);
}

function setViolationState(update) {
    _violations = structuredClone(update);
}

let _violations = null;