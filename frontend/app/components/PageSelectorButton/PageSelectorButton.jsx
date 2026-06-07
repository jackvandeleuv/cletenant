import Link from 'next/link';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorButton({ parcelpin, buttonLabel, buttonRoute }) {
    return (
        <Link 
            href={`/parcel/${parcelpin}/${buttonRoute}`}
            className={styles.pageSelectorButton}
        >
            {buttonLabel}
        </Link>
    )
}
