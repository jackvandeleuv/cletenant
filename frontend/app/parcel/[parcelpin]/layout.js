import styles from '@/app/parcel/[parcelpin]/parcelpin.module.css';
import PageSelectorButtonWrapper from '../../components/PageSelectorButton/PageSelectorButtonWrapper';
import SiteHeader from '../../components/SiteHeader/page';
import EmbeddedSearchBar from '../../components/EmbeddedSearchBar/EmbeddedSearchBar';
import { Suspense } from 'react';

export default function ParcelLayout({ children }) {

    return (
        <div className={styles.mainPageWrapper}>
            <div className={styles.searchHeader}>
                <SiteHeader />
                <Suspense>
                    <EmbeddedSearchBar />
                    <PageSelectorButtonWrapper />
                </Suspense>
                {children}
            </div>
        </div>
    )
}