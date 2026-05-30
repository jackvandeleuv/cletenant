import Link from 'next/link';
import styles from './parcelpin.module.css';

export default function EnforcementCard({ label, value, parcelpin, route }) {
    return (
        <Link
            className={styles.card}
            href={`/${parcelpin}/${route}`}
        >
            <h2>{label}</h2>
            <h2 className={styles.cardValue}>{value}</h2>
        </Link>
    )
}