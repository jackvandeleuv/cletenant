'use client';

import { useState } from 'react';
import SuggestionsBox from './components/SuggestionsBox/SuggestionsBox';
import styles from './SearchPage.module.css';
import { sleep } from './utils/utilities';
import { getSuggestions } from './utils/fetchData';

export default function MainSearch() {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);

    const handleSearchInput = async (input) => {
        console.log(input);
        if (!input || input.trim() === '') {
            setSuggestionsLoading(false);
            setSuggestionsHidden(true);
            return;
        }

        setSuggestionsLoading(true);
        setSuggestionsHidden(false);

        await sleep(300);

        const currentInput = document.getElementById('searchBox').value;
        if (input !== currentInput) return;

        try {
            setSuggestions(await getSuggestions(input));
            setSuggestionsLoading(false);
            setSuggestionsHidden(false);
        } catch (err) {
            setSuggestionsLoading(false);
            setSuggestionsHidden(true);
        }
    }

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.siteHeader}>
                <svg className={styles.homeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
                <h1 className={styles.siteHeaderName}>CleTenant</h1>
            </div>
            <div className={styles.searchBoxWrapper}>
                <input
                    type="text"
                    id="searchBox"
                    className={styles.searchBox}
                    autoComplete="off"
                    placeholder="Enter an address."
                    onChange={(e) => handleSearchInput(e.target.value)}
                />
                {!suggestionsHidden && <SuggestionsBox
                    suggestions={suggestions} 
                    loading={suggestionsLoading}
                />}
            </div>
        </div>
    )
}
