import styles from '../parcelpin.module.css';
import ComplaintTag from './ComplaintTag';

export default function ComplaintHealthCard({ complaint }) {
    const tagSpecs = (complaint) => {
        const COLS = [
            ['complaint_type', 'Type', 'oklch(90.1% 0.076 70.697)'],  // orange-200
            ['farm_animal', 'Farm Animal', 'oklch(93.8% 0.127 124.321)'],  // lime-200
            ['insect_vermin', 'Insect/Vermin', 'oklch(91.7% 0.08 205.041)'],  // cyan-200
            ['odor_strength', 'Odor Strength', 'oklch(87% 0.065 274.039)'],  // indigo-200
            ['odor_type', 'Odor Type', 'oklch(89.2% 0.058 10.001)'],  // rose-200
        ];
        const tagSpecs = [];
        let i = 0;
        for (const colSpec of COLS) {
            if (complaint[colSpec[0]]) {
                tagSpecs.push([i, colSpec[1], complaint[colSpec[0]], colSpec[2]]);
            }
            i += 1;
        }
        return tagSpecs;
    }

    return (
        <div className={styles.recordCard}>
            <div className={styles.recordCardInnerWrapper}>
                <div className={styles.recordCardHeaderWrapper}>
                        <svg className={styles.recordCardIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
                        </svg>
                        <div className={styles.recordCardHeader}>
                        <h4>Health Complaint</h4>
                        <h1 className={styles.recordCardValue}>{complaint.complaint_number}</h1>
                    </div>
                </div>
                <div className={styles.recordCardSubHeader}>
                    <p>Status: {complaint.complaint_status}</p>
                    <p>Created: {complaint.submit_date}</p>
                </div>
                {complaint.complaint_outcome && (
                    <div className={styles.recordCardSubHeader}>
                        <p>Outcome: {complaint.complaint_outcome}</p>
                    </div>
                )}
                <div className={styles.recordCardTagBox}>
                    {tagSpecs(complaint).map((spec) => (
                        <ComplaintTag 
                            key={spec[0]}
                            tag_name={spec[1]}
                            tag_value={spec[2]}
                            color={spec[3]}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}