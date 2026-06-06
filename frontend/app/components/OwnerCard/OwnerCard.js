import { parcelObjToTaxDelinquencyLabel } from '@/app/utils/utilities';
import styles from './OwnerCard.module.css';
import InfoButton from '../InfoButton/InfoButton';

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

export default function OwnerCard({ parcel }) {
    if (!parcel.owners) {
        return (<></>);
    }

    const OWNER_COLS = [
        'std_deeded_owner',
        'activerentalregistrationflag',
        'activecertificateapprovingrentaloccupancyflag',
        'leadsafecertificateactiveflag',
        'taxdelinquencyamount',
        'transfers_in_5y',
        'civil_tickets',
        'complaints_health',
        'code_violations',
        'complaints_311',
        'survey2022_grade_num',
        'parcels_owned',
    ];

    const taxDelinquency = parcelObjToTaxDelinquencyLabel(parcel.owners.taxdelinquencyamount);
    
    let avgSurveyGrade = null;
    if (
        parcel.owners && 
        parcel.owners.survey2022_grade_num && 
        parcel.owners.parcels_owned &&
        parcel.owners.parcels_owned > 0
    ) {
        avgSurveyGrade = (parcel.owners.survey2022_grade_num / parcel.owners.parcels_owned).toFixed(1);
    }

    const tableRows = [
        // [
        //     'Properties Owned', 
        //     parcel.owners.parcels_owned,
        //     `Total number of properties (known as "parcels") owned by ${parcel.owners.std_deeded_owner}`,
        // ],
        [
            'Registered Rentals', 
            parcel.owners.activerentalregistrationflag,
            `Number of properties owned by ${parcel.owners.std_deeded_owner} that have an active rental registration. All rental properties are required to be registered with the City of Cleveland.`,
        ],
        [
            'Civil Tickets', 
            parcel.owners.civil_tickets,
            'Fines issued by the City.',
        ],
        [
            'Code Violations', 
            parcel.owners.code_violations,
            'Official notices of building or zoning code violations.',
        ], 
        [
            '311 Complaints', 
            parcel.owners.complaints_311,
            'Complaints received through the 311 website or phone line.',
        ],
        [
            'Health Complaints', 
            parcel.owners.complaints_health,
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

    const properties = (parcel.owners.parcels_owned || 0) === 1 ? 'property' : 'properties';

    return (
        <div className={styles.parcelInfoHeaderWrapper}>
            <h1>Owner Summary</h1>
            <div className={styles.parcelInfoHeader}>
                <p className={styles.parcelInfoHeaderText}>
                    <strong>{parcel.owners.std_deeded_owner}</strong> owns {parcel.owners.parcels_owned} {properties}. 
                </p>
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