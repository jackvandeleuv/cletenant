import Link from 'next/link';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorButton({ parcelpin, buttonLabel, buttonRoute }) {
    return (
        <Link 
            href={`/${parcelpin}/${buttonRoute}`}
            className={styles.pageSelectorButton}
        >
            {buttonLabel}
        </Link>
    )
}
