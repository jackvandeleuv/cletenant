import styles from './parcelpin.module.css';

export default function ParcelInfoHeaderBox({ label, value }) {
   
    return (
        <div className={styles.parcelInfoHeaderBox}>
            <h3>{label}</h3>
            <h2 className={styles.parcelInfoHeaderBoxLabel}>{value}</h2>
        </div>
    )
}