"use client";

import { useState } from 'react';
import styles from '@/app/[parcelpin]/parcelpin.module.css';
import SuggestionsBox from '@/app/components/SuggestionsBox/SuggestionsBox';
import PageSelectorButtonWrapper from '../components/PageSelectorButton/PageSelectorButtonWrapper';
import { clearInputBox, handleSearchInput } from '../utils/search';
import SiteHeader from '../components/SiteHeader/page';

export default function SearchBar({ children }) {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className={styles.mainPageWrapper}>
            <div className={styles.searchHeader}>
                <SiteHeader />
                
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