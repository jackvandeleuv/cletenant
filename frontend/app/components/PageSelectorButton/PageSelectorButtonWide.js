import Link from 'next/link';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorButtonWide({ parcelpin, buttonLabel, buttonRoute, q, currentPage }) {
    const hrefObj = { pathname: `/parcel/${parcelpin}/${buttonRoute}` }
    if (q && q.trim() !== '') {
        hrefObj.query = { q };
    } 

    const extraStyle = currentPage ? {textDecoration: 'underline'} : {};

    return (
        <Link 
            href={hrefObj}
            className={styles.pageSelectorButtonWide}
            style={extraStyle}
        >
            {buttonLabel}
        </Link>
    )
}
