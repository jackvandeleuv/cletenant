import styles from './AddressBanner.module.css';

export default function AddressBanner({ parcel }) {
    const oneNum = parcel.parcel_addr_max === parcel.parcel_addr_min;
    const parcelNum = oneNum ? `${parcel.parcel_addr_max}` : `${parcel.parcel_addr_min}-${parcel.parcel_addr_max}`
    const parcelUnit = parcel.parcel_unit ? `(${parcel.parcel_unit})` : '';

    const parcelLabel = [
        parcelNum || '',
        parcel.parcel_predir || '',
        parcel.parcel_street || '',
        parcel.parcel_suffix || '',
        parcelUnit || '',
    ].join(' ')

    return (
        <div className={styles.addressHeaderBox}>
            <h2 className={styles.addressHeader}>{parcelLabel}</h2>
        </div>
    )
}