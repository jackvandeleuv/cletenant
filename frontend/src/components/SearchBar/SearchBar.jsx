import { useState } from 'react';
import PageSelectorButton from '../PageSelectorButton/PageSelectorButton';
import './SearchBar.css'
import { getSuggestions } from '../../utils/fetchData';
import Suggestion from '../Suggestion/Suggestion';
import SuggestionsBox from '../SuggestionsBox/SuggestionsBox';
import { sleep } from '../../utils/utilities';

function SearchBar({ currentPage, setCurrentPage, setCurrentParcel }) {
    const [pageButtonsHidden, setPageButtonsHidden] = useState({
        'parcelPage': true,
        'civilTickets': false,
        'codeViolations': false,
        'complaints311': false,
        'complaintsHealth': false,
    });
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsBoxState, setSuggestionsBoxState] = useState({
        hidden: true, 
        loading: false,
    });

    const togglePageButtonHidden = (pageID) => {
        setPageButtonsHidden((currentValues) => ({
            ...currentValues,
            [pageID]: !currentValues[pageID]
        }));
    }

    function insertParcelIntoSearchBox() {
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

            }))
        }
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

    const handleSearchInput = async (input) => {
        if (!input || input.trim() === '') {
            setSuggestionsBoxState({
                loading: false,
                hidden: true,
            })
            return;
        }

        setSuggestionsBoxState({
            loading: true,
            hidden: false,
        })

        await sleep(300);

        const currentInput = document.getElementById('searchBox').value;
        if (input !== currentInput) return;

        try {
            setSuggestions(await getSuggestions(input));
            setSuggestionsBoxState({
                loading: false,
                hidden: false,
            })
        } catch (err) {
            setSuggestionsBoxState({
                loading: false,
                hidden: true,
            });
        }
    }

    const pageIDToLabel = new Map([
        ['parcelPage', 'Overview'],
        ['civilTicketsPage', 'Civil Tickets'],
        ['violationsPage', 'Code Violations'],
        ['complaints311Page', 'Complaints (311)'],
        ['complaintsHealthPage', 'Complaints (Health)'],
    ])
    const pageIDs = Array.from(pageIDToLabel.keys());

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
                    onChange={(e) => handleSearchInput(e.target.value)}
                />
                <SuggestionsBox 
                    suggestions={suggestions} 
                    displayState={suggestionsBoxState}
                    setCurrentPage={setCurrentPage}
                    setCurrentParcel={setCurrentParcel}
                />
            </div>
            <div id="pageSelectorWrapper">
                <button id="pageSelector">
                    <p id="pageSelectorCurrentLabel">
                        {pageIDToLabel.get(currentPage)}
                    </p>
                    <svg id="pageSelectorButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                    </svg>
                </button>
                <div id="pageSelectorButtonWrapper" className="hidden">
                    {pageIDs.map((pageID) => 
                        <PageSelectorButton 
                            key={pageID}
                            pageID={pageID}
                            setCurrentPage={setCurrentPage}
                            isHidden={pageButtonsHidden[pageID]}
                        >
                            {pageIDToLabel.get(pageID)}
                        </PageSelectorButton>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;