import { parcelObjToTaxDelinquencyLabel } from '@/app/utils/utilities';
import styles from './OwnerCard.module.css';
import InfoButton from '../InfoButton/InfoButton';
import Link from 'next/link';

function TableRow({ label, value, infoMessage }) {
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tableDataLabel}>
                {label}
                <InfoButton message={infoMessage} />
            </td>
            <td 
                className={styles.tableDataValue}
            >
                {value}
            </td>
        </tr>
    )
}

export default function OwnerCard({ owner, owner_id, includeSubtitle }) {
    if (!owner) {
        return (<></>);
    }

    const taxDelinquency = parcelObjToTaxDelinquencyLabel(owner.taxdelinquencyamount);
    
    let avgSurveyGrade = null;
    if (
        owner && 
        owner.survey2022_grade_num && 
        owner.parcels_owned_with_survey &&
        owner.parcels_owned_with_survey > 0
    ) {
        avgSurveyGrade = (owner.survey2022_grade_num / owner.parcels_owned_with_survey).toFixed(1);
    }

    const tableRows = [
        // [
        //     'Properties Owned', 
        //     parcel.owners.parcels_owned,
        //     `Total number of properties (known as "parcels") owned by ${owner.std_deeded_owner}`,
        // ],
        [
            'Registered Rentals', 
            owner.activerentalregistrationflag,
            `Number of properties owned by ${owner.std_deeded_owner} that have an active rental registration. All rental properties are required to be registered with the City of Cleveland.`,
        ],
        [
            'Civil Tickets', 
            owner.civil_tickets,
            'Fines issued by the City.',
        ],
        [
            'Code Violations', 
            owner.code_violations,
            'Official notices of building or zoning code violations.',
        ], 
        [
            '311 Complaints', 
            owner.complaints_311,
            'Complaints received through the 311 website or phone line.',
        ],
        [
            'Health Complaints', 
            owner.complaints_health,
            'Complaints received by the City Department of Public Health.',
        ],
        [
            'Delinquent Taxes', 
            taxDelinquency,
            'Total delinquent property taxes owed to the County.'
        ],
    ];
    if (avgSurveyGrade) {
        tableRows.push([
            'Average Survey Grade', 
            avgSurveyGrade,
            `Average condition grade in the 2022 property survey. Scores are on a 4.0 GPA-style scale.`
        ]);
    }

    const properties = (owner.parcels_owned || 0) === 1 ? 'property' : 'properties';

    return (
        <div className={styles.parcelInfoHeaderWrapper}>
            <h1>Owner Summary</h1>
            <div className={styles.parcelInfoHeader}>
                {includeSubtitle && (
                    <p className={styles.parcelInfoHeaderText}>
                        <strong><Link style={{textDecoration: 'underline'}} href={`/owner/${owner_id}`}>{owner.std_deeded_owner}</Link></strong> owns <strong>{owner.parcels_owned}</strong> {properties}. 
                    </p>
                )}
            </div>
            <table className={styles.table}>
                <tbody className={styles.tbody}>
                    {tableRows.map((row) => (
                        <TableRow 
                            key={row[0]} 
                            label={row[0]} 
                            value={row[1]}
                            infoMessage={row[2]}
                        />
                    ))} 
                </tbody>    
            </table>
        </div>
    );
}