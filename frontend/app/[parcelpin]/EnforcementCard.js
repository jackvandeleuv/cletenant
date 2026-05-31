import Link from 'next/link';
import styles from './parcelpin.module.css';

export default function EnforcementCard({ label, value, parcelpin, route, subtitle }) {
    return (
        <Link
            className={styles.card}
            href={`/${parcelpin}/${route}`}
        >
            <h2>{label}</h2>
            <h3 className={styles.enforcementCardSubtitle}>
                {subtitle}
            </h3>
            <h1 className={styles.cardValue}>{value}</h1>
        </Link>
    )
}