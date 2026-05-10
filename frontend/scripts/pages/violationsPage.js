import { getViolations } from "../fetchData.js";
import { convertDateObjectToLabel, updateContentWrapper } from "../utilities.js";
import { getParcelPageParcelState } from "./parcelPage.js";

const violationCard = (violation) => {
    const issueDate = convertDateObjectToLabel(new Date(violation.issue_date));
    let buttonElem = '';
    if (violation.accela_citizen_access_url) {
        buttonElem = `
            <a 
                class="acaLinkButtonWrapper"
                href="${violation.accela_citizen_access_url}"
                target="_blank"
            >
                <svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                </svg>
                <button class="acaLinkButton">More</button>
            </a>
        `;
    }
    // return `
    //     <div class="recordCard">
    //         <div class="recordCardHeader">
    //             <h3>Code Violation</h3>
    //             <h1 class="recordCardValue">${violation.record_id}</h1>
    //         </div>
    //         <div class="recordCardSubHeader">
    //             <p>Type: ${violation.type_of_violation}</p>
    //             <p>Issued: ${issueDate}</p>
    //         </div>
    //         ${buttonElem}
    //     </div>
    // `;
    return `
        <div class="recordCard">
            <div class="recordCardInnerWrapper">
                <div class="recordCardHeaderWrapper">
                        <svg class="recordCardIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="m880-194-80-80v-326H474l-74-74v-86h-86l-80-80h246v160h400v486ZM820-28l-94-92H80v-648l-52-52 56-56L876-84l-56 56ZM160-200h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h166l-80-80h-86v80Zm240-240h-80v-80h80v80Z"/>
                        </svg>
                        <div class="recordCardHeader">
                        <h4>Code Violation</h4>
                        <h1 class="recordCardValue">${violation.record_id}</h1>
                    </div>
                </div>
                <div class="recordCardSubHeader">
                    <p>Type: ${violation.type_of_violation}</p>
                    <p>Issued: ${issueDate}</p>
                </div>
                ${buttonElem}
            </div>
        </div>
    `;
}

const violationPage = () => {
    const violations = getViolationState();
    console.log(violations)
    const recordCardsElem = violations
        .map((row) => violationCard(row))
        .join('\n');

    return `
        <div id="recordPageHeader">
            <h1 id="recordPageHeaderCount">
                Total Code Violations: ${violations.length}
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

export async function renderViolationsPage() {
    const parcel = getParcelPageParcelState();
    const parcelpin = parcel.parcel;
    const violations = await getViolations(parcelpin);

    for (let i = 0; i < violations.length; i++) {
        violations[i].issue_date = new Date(violations[i].issue_date);
    }
    violations.sort((a, b) => b.issue_date.getTime() - a.issue_date.getTime());

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