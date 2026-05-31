import styles from '../parcelpin.module.css';

export default function CivilTicketsCard({ record }) {
    const hasLink = record.accela_citizen_access_url !== undefined;
    return (
        <div className={styles.recordCard}>
            <div className={styles.recordCardInnerWrapper}>
                <div className={styles.recordCardHeaderWrapper}>
                    <svg className={styles.recordCardIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z"/>
                    </svg>
                    <div className={styles.recordCardHeader}>
                        <h4>Civil Ticket</h4>
                        <h1 className={styles.recordCardValue}>{record.ticket_id}</h1>
                    </div>
                </div>
                <div className={styles.recordCardSubHeader}>
                    <p>Filed: {record.file_date}</p>
                    <p>Issued: {record.issue_date}</p>
                </div>
                <p>
                    Status: {record.ticket_status}
                </p>
                {record.additional_citation_details && (
                    <p>
                        {record.additional_citation_details}
                    </p>
                )}                
                {hasLink &&
                    <a 
                        className={styles.acaLinkButtonWrapper}
                        href={record.accela_citizen_access_url}
                        target="_blank"
                    >
                        <svg className={'defaultIcon'} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                        </svg>
                        <button className={styles.acaLinkButton}>More</button>
                    </a>
                }
            </div>
        </div>
    )
}