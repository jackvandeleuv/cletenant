import styles from './AddressBanner.module.css';

export default function AddressBanner({ parcel }) {
    return (
        <div className={styles.addressHeaderBox}>
            <h1 className={styles.addressHeader}>{parcel.par_addr_all}</h1>
            <h2>Parcel {parcel.parcel}</h2>
        </div>
    )
}