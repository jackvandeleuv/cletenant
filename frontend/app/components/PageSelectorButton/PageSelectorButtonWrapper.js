'use client';

import { useState } from 'react';
import styles from './PageSelectorButton.module.css';
import PageSelectorButton from './PageSelectorButton';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageSelectorButtonWrapper() {
    // Get URL params.
    const searchParams = useSearchParams()
    const q = searchParams.get('q') ?? '';

    // Get URL path.
    const pathName = usePathname();
    const parts = pathName.split('/');
    const parcelpin = parts[2];
    const currentRoute = parts[3] ?? '';

    const [buttonsHidden, setButtonsHidden] = useState(true);
    let pagesSpec = [
        ['', 'Overview'],
        ['civil-tickets', 'Civil Tickets'],
        ['violations', 'Code Violations'],
        ['complaints-311', 'Complaints (311)'],
        ['complaints-health', 'Complaints (Health)'],
    ];
    const currentLabel = pagesSpec.filter((row) => row[0] === currentRoute).pop()[1];
    pagesSpec = pagesSpec.filter((row) => row[0] !== currentRoute);
    
    return (
        <div 
            className={styles.pageSelectorWrapper}
            onClick={(() => setButtonsHidden(!buttonsHidden))}
        >
            <button className={styles.pageSelector}>
                <p className={styles.pageSelectorCurrentLabel}>
                    {currentLabel}
                </p>
                <svg 
                    className={styles.pageSelectorButtonIcon} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960"
                >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
            </button>
            <div className={`${styles.pageSelectorButtonWrapper} ${buttonsHidden ? 'hidden': ''}`}>
                {pagesSpec.map((spec) => 
                    <PageSelectorButton
                        key={spec[0]}
                        parcelpin={parcelpin}
                        q={q}
                        buttonLabel={spec[1]}
                        buttonRoute={spec[0]}
                    >
                        {spec[1]}
                    </PageSelectorButton>
                )}
            </div>
        </div>
    )
}