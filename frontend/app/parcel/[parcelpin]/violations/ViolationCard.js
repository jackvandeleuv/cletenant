import styles from '../parcelpin.module.css';

export default function ViolationCard({ record }) {
    const hasLink = record.accela_citizen_access_url !== undefined;

    return (
        <div className={styles.recordCard}>
            <div className={styles.recordCardInnerWrapper}>
                <div className={styles.recordCardHeaderWrapper}>
                    <svg 
                        className={styles.recordCardIcon} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 -960 960 960"
                    >
                        <path d="m880-194-80-80v-326H474l-74-74v-86h-86l-80-80h246v160h400v486ZM820-28l-94-92H80v-648l-52-52 56-56L876-84l-56 56ZM160-200h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h166l-80-80h-86v80Zm240-240h-80v-80h80v80Z"/>
                    </svg>
                    <div className={styles.recordCardHeader}>
                        <h4>Code Violation</h4>
                        <h1 className={styles.recordCardValue}>{record.record_id}</h1>
                    </div>
                </div>
                <div className={styles.recordCardSubHeader}>
                    <p>Type: {record.type_of_violation}</p>
                    <p>Issued: {record.issue_date}</p>
                </div>
                {hasLink && 
                    <a 
                        className={styles.acaLinkButtonWrapper}
                        href={record.accela_citizen_access_url}
                        target="_blank"
                    >
                        <svg 
                            className={'defaultIcon'} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 -960 960 960"
                        >
                            <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                        </svg>
                        <button className={styles.acaLinkButton}>More</button>
                    </a>
                }
            </div>
        </div>
    )
}