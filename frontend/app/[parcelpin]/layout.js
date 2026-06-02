"use client";

import { useState } from 'react';
import styles from '@/app/[parcelpin]/parcelpin.module.css';
import SuggestionsBox from '@/app/components/SuggestionsBox/SuggestionsBox';
import PageSelectorButtonWrapper from '../components/PageSelectorButton/PageSelectorButtonWrapper';
import { clearInputBox, handleSearchInput } from '../utils/search';
import Link from 'next/link';

export default function SearchBar({ children }) {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className={styles.mainPageWrapper}>
            <div className={styles.searchHeader}>
                <div className={styles.siteHeader}>
                    <Link 
                        className={styles.homeButton}
                        href='/'
                    >
                        <svg className={styles.homeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                        </svg>
                        <h3 className={styles.siteHeaderName}>CleTenant</h3>
                    </Link>
                </div>
                <div className={styles.searchBoxWrapper}>
                    <div className={styles.inputBoxWrapper}>
                        <input
                            type="text"
                            id="searchBox"
                            className={styles.searchBox}
                            autoComplete="off"
                            placeholder="Enter an address."
                            onChange={(e) => handleSearchInput(e.target.value, setSuggestions, setSuggestionsLoading, setSuggestionsHidden, setSearchInput)}
                        />
                        {searchInput !== '' && (
                            <button
                                className={styles.clearInputBoxButton}
                                onClick={(() => clearInputBox(setSuggestionsLoading, setSuggestionsHidden, setSearchInput))}
                            >
                                <svg className={styles.clearInputBoxIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    {!suggestionsHidden && (
                        <SuggestionsBox 
                            suggestions={suggestions} 
                            loading={suggestionsLoading}
                            topDist={'58px'}
                            topPadding={'0px'}
                        />
                    )}
                </div>

                <PageSelectorButtonWrapper />
                {children}
            </div>
        </div>
    )
}