import EmbeddedSearchBar from '@/app/components/EmbeddedSearchBar/EmbeddedSearchBar';
import SiteHeader from '@/app/components/SiteHeader/page';
import styles from '@/app/parcel/[parcelpin]/parcelpin.module.css';

export default function OwnerLayout({ children }) {
    return (
        <div className={styles.mainPageWrapper}>
            <div className={styles.searchHeader}>
                <SiteHeader />
                <EmbeddedSearchBar />
                {children}
            </div>
        </div>
    )
}