"use client";

import { useState } from 'react';
import PageSelectorButton from './components/PageSelectorButton/PageSelectorButton';
import styles from './layout.module.css';
import { getSuggestions } from '../utils/fetchData';
import SuggestionsBox from './components/SuggestionsBox/SuggestionsBox';
import { sleep } from '../utils/utilities';

export default function SearchBar({ children }) {
    // const test = async () => {
    //     console.log(await getSuggestions('hi'))
    // }
    // test();

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
        <div className={styles.searchHeader}>
            <div className={styles.siteHeader}>
                <svg className={styles.homeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
                <h3 className={styles.siteHeaderName}>CleScout</h3>
            </div>
            <div className={styles.searchBoxWrapper}>
                <input
                    type="text"
                    id="searchBox"
                    className={styles.searchBox}
                    autoComplete="off"
                    placeholder="Address or owner"
                    onChange={(e) => handleSearchInput(e.target.value)}
                />
                <SuggestionsBox 
                    suggestions={suggestions} 
                    displayState={suggestionsBoxState}
                    setCurrentPage={() => {}}
                    setCurrentParcel={() => {}}
                />
            </div>
            <div className={styles.pageSelectorWrapper}>
                <button className={styles.pageSelector}>
                    <p className={styles.pageSelectorCurrentLabel}>
                        {/* {pageIDToLabel.get(currentPage)} */}
                        {'Overview'}
                    </p>
                    <svg className={styles.pageSelectorButtonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                    </svg>
                </button>
                <div className={`${styles.pageSelectorButtonWrapper} ${styles.hidden}`}>
                    {pageIDs.map((pageID) => 
                        <PageSelectorButton 
                            key={pageID}
                            pageID={pageID}
                            setCurrentPage={() => {}}
                            isHidden={pageButtonsHidden[pageID]}
                        >
                            {pageIDToLabel.get(pageID)}
                        </PageSelectorButton>
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}