import styles from './RentalCard.module.css';

export default function RentalCard({ parcel }) {
    const stateMap = {
        certified: {
            title: 'Certified Lead Safe',
            message: 'This property is registered as a rental with the City of Cleveland and is certified safe from lead contamination.',
            icon: (
                <svg className={`${styles.cardIcon} ${styles.green}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" >
                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
            ),
        },
        nonCompliance: {
            title: 'Out Of Compliance',
            message: 'This property is registered as a rental with the City of Cleveland, but has failed to get its required lead safe certification.',
            icon: (
                <svg className={`${styles.cardIcon} ${styles.red}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            ),
        },
        unknown: {
            title: 'Not A Known Rental',
            message: 'This property is not registered as a rental with the City of Cleveland. Unregistered rentals should be reported to the city.',
            icon: (
                <svg className={`${styles.cardIcon} ${styles.orange}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M200-800v640-640 200-200Zm80 400h147q11-23 25.5-43t32.5-37H280v80Zm0 160h123q-3-20-3-40t3-40H280v80ZM200-80q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h320l240 240v92q-19-6-39-9t-41-3v-40H480v-200H200v640h227q11 23 25.5 43T485-80H200Zm621.5-341.5Q880-363 880-280t-58.5 141.5Q763-80 680-80t-141.5-58.5Q480-197 480-280t58.5-141.5Q597-480 680-480t141.5 58.5Zm-123 254Q706-175 706-186t-7.5-18.5Q691-212 680-212t-18.5 7.5Q654-197 654-186t7.5 18.5Q669-160 680-160t18.5-7.5ZM662-236h36v-10q0-11 6-19.5t14-16.5q14-12 22-23t8-31q0-29-19-46.5T680-400q-23 0-41.5 13.5T612-350l32 14q3-12 12.5-21t23.5-9q15 0 23.5 7.5T712-336q0 11-6 18.5T692-302q-6 6-12.5 12T668-276q-3 6-4.5 12t-1.5 14v14Z"/>
                </svg>
            ),
        }
    }

    const rentalStatus = (parcel) => {
        if (parcel.leadsafecertificateactiveflag === 1) {
            return 'certified'
        } else if (
            parcel.activecertificateapprovingrentaloccupancyflag === 1 ||
            parcel.activerentalregistrationflag === 1
        ) {
            return 'nonCompliance'
        } else {
            return 'unknown'
        }
    }

    const labels = stateMap[rentalStatus(parcel)];

    return (
        <div className={styles.overviewCard}>
            <h1 className={styles.overviewCardStatus}>
                {labels.title}
            </h1>
            <div className={styles.overviewCardHeader}>
                {labels.icon}
                <h3>
                    {labels.message}
                </h3>
            </div>
            {rentalStatus(parcel) !== 'certified' && (
                <div>
                    <a 
                        href="https://www.clevelandohio.gov/311/building-housing" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className={styles.reportButton}>
                            Report
                        </button>
                    </a>
                </div>
            )}
        </div>
    )
}