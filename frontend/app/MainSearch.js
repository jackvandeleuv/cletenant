'use client';

import { useState } from 'react';
import SuggestionsBox from './components/SuggestionsBox/SuggestionsBox';
import styles from './SearchPage.module.css';
import { clearInputBox, handleSearchInput } from './utils/search';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchModeSelector from './components/SearchModeSelector/SearchModeSelector';

export default function MainSearch() {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestionsHidden, setSuggestionsHidden] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchMode, setSearchMode] = useState('parcels');

    const searchParams = useSearchParams()
    const q = searchParams.get('q') ?? '';

    return (
        <div className={styles.outerPageWrapper}>
            <Link className={styles.aboutLink} href={'/about'}>About</Link>
            <div className={styles.mainPageWrapper}>
                <div className={styles.searchWrapper}>
                    <div className={styles.siteHeader}>
                        <svg className={styles.homeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                        </svg>
                        <h1 className={styles.siteHeaderName}>CleTenant</h1>
                    </div>
                    <div className={styles.siteSubHeaderWrapper}>
                        <h1 className={styles.siteSubHeader}>
                            Find information about any property in the city of Cleveland.
                        </h1>
                    </div>
                    <div className={styles.searchBoxWrapper}>
                        <div className={styles.inputBoxWrapper}>
                            <input
                                type="text"
                                id="searchBox"
                                className={styles.searchBox}
                                autoComplete="off"
                                placeholder="Enter an address."
                                defaultValue={q}
                                onChange={(e) => handleSearchInput(e.target.value, setSuggestions, setSuggestionsLoading, setSuggestionsHidden, setSearchInput, 'owner')}
                                autoFocus
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
                                searchInput={searchInput}
                                topDist={'40px'}
                                topPadding={'15px'}
                                maxWidth={'800px'}
                            />
                        )}
                    </div>
                    
                    <SearchModeSelector />

                    <h3 className={styles.siteSubSubHeader}>
                        This tool uses public, government data, but it is not affiliated with the City or County.
                    </h3>
                </div>
            </div>
        </div>
    )
}