'use client';

import { useEffect, useState } from 'react';
import styles from './PageSelectorButton.module.css';
import PageSelectorButton from './PageSelectorButton';
import { usePathname, useSearchParams } from 'next/navigation';
import PageSelectorWide from './PageSelectorWide';
import PageSelectorNarrow from './PageSelectorNarrow';

export default function PageSelectorButtonWrapper() {
    // Get URL params.
    const searchParams = useSearchParams()
    const q = searchParams.get('q') ?? '';

    const [wideScreen, setWideScreen] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 800px)');

        const updateScreenSize = () => {
            setWideScreen(media.matches);
        }

        updateScreenSize();

        media.addEventListener('change', updateScreenSize);

        // Clean up when unmounting.
        return () => {
            media.removeEventListener('change', updateScreenSize)
        }
    }, []);

    // Get URL path.
    const pathName = usePathname();
    const parts = pathName.split('/');
    const parcelpin = parts[2];
    const currentRoute = parts[3] ?? '';

    const [buttonsHidden, setButtonsHidden] = useState(true);
    let pagesSpec = [
        ['', 'Overview'],
        ['violations', 'Code Violations'],
        ['civil-tickets', 'Civil Tickets'],
        ['complaints-311', '311 Complaints'],
        ['complaints-health', 'Health Complaints'],
    ];
    
    return (
        <>
            {wideScreen ? (
                <PageSelectorWide 
                    parcelpin={parcelpin}
                    setButtonsHidden={setButtonsHidden}
                    currentRoute={currentRoute}
                    pagesSpec={pagesSpec}
                    q={q}
                />
            ) : (
                <PageSelectorNarrow
                    parcelpin={parcelpin}
                    buttonsHidden={buttonsHidden}
                    setButtonsHidden={setButtonsHidden}
                    currentRoute={currentRoute}
                    pagesSpec={pagesSpec}
                    q={q}
                />
            )}
        </>
    )
}