import styles from './OwnerBanner.module.css';

export default function OwnerBanner({ owner }) {
    return (
        <div className={styles.addressHeaderBox}>
            <h1 className={styles.addressHeader}>{owner.std_deeded_owner}</h1>
            <h2>Properties Owned: {owner.parcels_owned}</h2>
        </div>
    )
}