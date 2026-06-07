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

    // useEffect(() => {
    //     const matches = window.matchMedia('(min-width: 800px)').matches;
    //     console.log(matches);
    // }, []);

    const [wideScreen, setWideScreen] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 800px)');

        const updateScreenSize = () => {
            console.log(media.matches)
            setWideScreen(media.matches);
        }

        updateScreenSize();

        media.addEventListener('change', updateScreenSize);

        // Clean up when unmounting.
        return () => {
            media.removeEventListener('change', updateScreenSize)
        }
    }, []);

    useEffect(() => {
        console.log('wide screen state:')
        console.log(wideScreen)
    }, [wideScreen]);

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