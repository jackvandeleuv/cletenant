"use client";

import { useState } from 'react';
import styles from '@/app/[parcelpin]/parcelpin.module.css';
import { getSuggestionsByAddress } from '@/app/utils/fetchData';
import SuggestionsBox from '@/app/components/SuggestionsBox/SuggestionsBox';
import { sleep } from '@/app/utils/utilities';
import { parseAddress } from '@/app/utils//parseAddress';

export default function SearchBar({ children }) {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);

    const handleSearchInput = async (input) => {
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

        const parsed = parseAddress(input);

        try {
            setSuggestions(await getSuggestionsByAddress(input, parsed));
            setSuggestionsLoading(false);
            setSuggestionsHidden(false);
        } catch (err) {
            setSuggestionsLoading(false);
            setSuggestionsHidden(true);
        }
    }

    return (
        <div className={styles.searchHeader}>
            <div className={styles.siteHeader}>
                <svg className={styles.homeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
                <h3 className={styles.siteHeaderName}>CleTenant</h3>
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
                {!suggestionsHidden && <SuggestionsBox 
                    suggestions={suggestions} 
                    loading={suggestionsLoading}
                />}
            </div>
            {children}
        </div>
    )
}