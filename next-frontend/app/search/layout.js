"use client";

import { useState } from 'react';
import styles from './SearchPage.module.css';
import { getSuggestions } from '../utils/fetchData';
import SuggestionsBox from './components/SuggestionsBox/SuggestionsBox';
import { sleep } from '../utils/utilities';

export default function SearchBar({ children }) {
    // const test = async () => {
    //     console.log(await getSuggestions('hi'))
    // }
    // test();


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
            {children}
        </div>
    )
}