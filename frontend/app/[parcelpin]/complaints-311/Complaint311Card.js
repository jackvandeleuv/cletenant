import { convertDateObjectToLabel } from '@/app/utils/utilities';
import styles from '../parcelpin.module.css';

export default function Complaint311Card({ complaint }) {
    const requestedTime = convertDateObjectToLabel(new Date(complaint.requested_datetime));
    const otherTime = complaint.closed_date ? convertDateObjectToLabel(new Date(complaint.closed_date)) : convertDateObjectToLabel(new Date(complaint.target_date));
    const otherLabel = complaint.closed_date ? 'Closed' : 'Target';

    return (
        <div className={styles.recordCard}>
            <div className={styles.recordCardInnerWrapper}>
                <div className={styles.recordCardHeaderWrapper}>
                    <svg className={styles.recordCardIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/>
                    </svg>
                    <div className={styles.recordCardHeader}>
                        <h4>311 Complaint</h4>
                        <h1 className={styles.recordCardValue}>{complaint.service_request_id}</h1>
                    </div>
                </div>
                <div className={styles.recordCardComplaintSubHeader}>
                    <p>Type: {complaint.service_name}</p>
                    <div className={styles.statusDescriptionWrapper}>
                        <p>Status: {complaint.status_description}</p>
                    </div>
                </div>
                <div className={styles.recordCardSubHeader}>
                    <p>Created: {requestedTime}</p>
                    <p>{otherLabel}: {otherTime}</p>
                </div>
            </div>
        </div>
    )
}