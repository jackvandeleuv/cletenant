'use client';

import { clearInputBox, handleSearchInput } from '@/app/utils/search';
import SuggestionsBox from '../SuggestionsBox/SuggestionsBox';
import styles from './EmbeddedSearchBar.module.css';
import { useState } from 'react';

export default function EmbeddedSearchBar() {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    
    return (
        <div className={styles.searchBoxWrapper}>
            <div className={styles.inputBoxWrapper}>
                <input
                    type="text"
                    id="searchBox"
                    className={styles.searchBox}
                    autoComplete="off"
                    placeholder="Enter an address."
                    onChange={(e) => (
                        handleSearchInput(
                            e.target.value, 
                            setSuggestions, 
                            setSuggestionsLoading, 
                            setSuggestionsHidden, 
                            setSearchInput
                        )
                    )}
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
    )
}