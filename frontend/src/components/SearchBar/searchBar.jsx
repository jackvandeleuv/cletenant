import './SearchBar.css'

function SearchBar() {
    return (
        <div id="searchHeader">
            <div id="siteHeader">
                <svg className="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
                <h3 id="siteHeaderName">CleScout</h3>
            </div>
            <div id="searchBoxWrapper">
                <input
                    type="text"
                    id="searchBox"
                    autoComplete="off"
                    placeholder="Address or owner"
                />
                <div id="suggestionBox" className="hidden"></div>
            </div>
            <div id="pageSelectorWrapper">
                <button id="pageSelector">
                    <p id="pageSelectorCurrentLabel">
                        Overview
                    </p>
                    <svg id="pageSelectorButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                    </svg>
                </button>
                <div id="pageSelectorButtonWrapper" className="hidden">
                    <button id="parcelPage" className="pageSelectorButton noDisplay">Overview</button>
                    <button id="civilTicketsPage" className="pageSelectorButton">Civil Tickets</button>
                    <button id="violationsPage" className="pageSelectorButton">Code Violations</button>
                    <button id="complaints311Page" className="pageSelectorButton">Complaints (311)</button>
                    <button id="complaintsHealthPage" className="pageSelectorButton">Complaints (Health)</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;