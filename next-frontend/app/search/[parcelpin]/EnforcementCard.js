import styles from './parcelpin.module.css';

export default function EnforcementCard({ label, value}) {
    return (
        <div className={styles.card}>
            <h2>{label}</h2>
            <h2 className={styles.cardValue}>{value}</h2>
        </div>
    )
}