import Link from 'next/link';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorButton({ parcelpin, buttonLabel, buttonRoute, q }) {
    const hrefObj = { pathname: `/parcel/${parcelpin}/${buttonRoute}` }
    if (q && q.trim() !== '') {
        hrefObj.query = { q };
    } 

    return (
        <Link 
            href={hrefObj}
            className={styles.pageSelectorButton}
        >
            {buttonLabel}
        </Link>
    )
}
