import styles from './parcelpin.module.css';

export default function ParcelInfoHeaderBox({ label, value}) {
    console.log('rendering info header')
    console.log(label)
    return (
        <div className={styles.parcelInfoHeaderBox}>
            <h3>{label}</h3>
            <h2 className={styles.parcelInfoHeaderBoxLabel}>{value}</h2>
        </div>
    )
}