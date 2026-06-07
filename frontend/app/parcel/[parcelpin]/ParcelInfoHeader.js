import Link from 'next/link';
import { convertDateObjectToLabel, parcelObjToTaxDelinquencyLabel } from '../../utils/utilities';
import styles from './parcelpin.module.css';

function ParcelInfoHeaderBox({ label, value, owner_id }) {
    let valueElem = <h2 className={styles.parcelInfoHeaderBoxLabel}>{value}</h2>;
    if (owner_id) {
        valueElem = (
            <Link
                className={styles.parcelInfoHeaderBoxLabel}
                style={{textDecoration: 'underline'}}
                href={`/owner/${owner_id}`}
            >
                {value}
            </Link>
        );
    }
    return (
        <div className={styles.parcelInfoHeaderBox}>
            <h3>{label}</h3>
            {valueElem}
        </div>
    )
}

export default function ParcelInfoHeader({ parcel }) {
    const transferDate = convertDateObjectToLabel(new Date(parcel.last_transfer_date));
    // const taxDelinquency = parcelObjToTaxDelinquencyLabel(parcel.taxdelinquencyamount);
    
    const infoBoxes = [
        ['Property Owner', parcel.owners.std_deeded_owner || 'MISSING', parcel.owner_id],
        ['Last Ownership Transfer', transferDate],
        ['Transferred From', parcel.grantor || 'None'],
        ['Transfers (Last 5 Years)', parcel.transfers_in_5y || 0],
    ];

    return (
        <div className={styles.parcelInfoHeaderWrapper}>
            <h1>Ownership Info</h1>
            <div className={styles.parcelInfoHeader}>
                {infoBoxes.map((row) => ( 
                    <ParcelInfoHeaderBox 
                        key={row[0]}
                        label={row[0]}
                        value={row[1]}
                        owner_id={row[2] ?? undefined}
                    />
                ))}            
            </div>
        </div>
    )
}