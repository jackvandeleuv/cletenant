export default function ViolationCard() {
    return (
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
    )
}