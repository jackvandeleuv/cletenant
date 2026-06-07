import { convertDateObjectToLabel, parcelObjToAddressLabel } from '@/app/utils/utilities';
import styles from './ParcelCarosel.module.css';
import Link from 'next/link';

const neighborhoodColors = {
    "Bellaire-Puritas": "#A7C7E7",
    "Broadway-Slavic Village": "#F7C6C7",
    "Brooklyn Centre": "#C1E1C1",
    "Buckeye-Shaker Square": "#FFD8A8",
    "Buckeye-Woodhill": "#D7BDE2",
    "Central": "#B5EAD7",
    "Clark-Fulton": "#FFDAC1",
    "Collinwood-Nottingham": "#C7CEEA",
    "Cudell": "#E2F0CB",
    "Cuyahoga Valley": "#F3C4FB",
    "Detroit Shoreway": "#BDE0FE",
    "Downtown": "#FFC8DD",
    "Edgewater": "#D0F4DE",
    "Euclid-Green": "#FDE2E4",
    "Fairfax": "#CDE7BE",
    "Glenville": "#E4C1F9",
    "Goodrich-Kirtland Pk": "#A9DEF9",
    "Hopkins": "#FCF6BD",
    "Hough": "#FFCBC1",
    "Jefferson": "#B8E0D2",
    "Kamm's": "#F1C0E8",
    "Kinsman": "#D8E2DC",
    "Lee-Harvard": "#C9E4DE",
    "Lee-Seville": "#FAD2E1",
    "Mount Pleasant": "#BEE1E6",
    "North Shore Collinwood": "#F0EFEB",
    "Ohio City": "#DDBEA9",
    "Old Brooklyn": "#B7D3F2",
    "St.Clair-Superior": "#FFE5B4",
    "Stockyards": "#EADCF8",
    "Tremont": "#C6DEF1",
    "Union-Miles": "#F6DFEB",
    "University": "#D4F1F4",
    "West Boulevard": "#E2ECE9",
};

function ParcelCaroselCard({ parcel }) {
    const label = parcelObjToAddressLabel(parcel);
    const color = neighborhoodColors[parcel.neighborhood] ?? 'var(--disabled-gray)';
    const transferDate = convertDateObjectToLabel(new Date(parcel.last_transfer_date));

    return (
        <Link 
            className={styles.parcelCaroselCard}
            href={`/parcel/${parcel.parcel}`}
        >
            <div className={styles.neighborhoodTagWrapper}>
                <p 
                    className={styles.neighborhoodTag} 
                    style={{backgroundColor: color}}
                >
                    {parcel.neighborhood}
                </p>
            </div>
            <h2 className={styles.parcelCaroselCardLabel}>
                {label}
            </h2>
            <p>
                Last Transfer: {transferDate}
            </p>
            <p>
                Parcel {parcel.parcel}
            </p>
        </Link>
    )
}

export default function ParcelCarosel({ parcels }) {
    const sortedParcels = parcels.sort((a, b) => b.last_transfer_date - a.last_transfer_date);
    return (
        <div className={styles.surveyCard}>
            <h1>Properties Owned</h1>
            <div className={styles.carosel}>
                {sortedParcels.map((par) => (
                    <ParcelCaroselCard key={par.parcel} parcel={par} />
                ))}
            </div>
        </div>
    )
}