import { getParcel } from "../utils/fetchData";
import { convertDateObjectToLabel, sleep } from "../utils/utilities.js";
import ParcelInfoHeaderBox from "./ParcelInfoHeaderBox.js";
import EnforcementCard from "./EnforcementCard.js";
import styles from './parcelpin.module.css';
import { logPageVisited } from "../utils/analytics";
import AddressBanner from "../components/AddressBanner/AddressBanner";
import RentalCard from "../components/RentalCard/RentalCard";
import InfractionCard from "../components/InfractionCard/InfractionCard";

export default async function ParcelPage({ params }) {
    // await sleep(100000);

    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    // logPageVisited(parcelpin, 'overview');
    
    const transferDate = convertDateObjectToLabel(new Date(parcel.last_transfer_date));
    const taxDelinquency = `
        $${(parcel.taxdelinquencyamount || 0).toLocaleString(
            "en-US", 
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}
    `.trim();

    const infoBoxes = [
        ['Parcel Owner', parcel.parcel_owner],
        ['Tax Delinquency', taxDelinquency],
        ['Last Transfer Date', transferDate],
        ['Transfers Last 5 Years', parcel.transfers_in_5y],
    ];
    
    const enforcement = [
        [
            'Civil Tickets', 
            parcel.civil_tickets, 
            'civil-tickets',
            'Fines issued by the City.',
        ],
        [
            'Code Violations', 
            parcel.code_violations, 
            'violations',
            'Official notices of building or zoning code violations.'
        ],
    ];

    const complaints = [
        [
            '311 Complaints', 
            parcel.complaints_311, 
            'complaints-311',
            'Complaints received through the 311 website or phone line.'
        ],
        [
            'Health Complaints', 
            parcel.complaints_health, 
            'complaints-health',
            'Complaints received by the City Department of Public Health.'
        ],
    ];


    const codeInfractionBody = `City of Cleveland issues civil tickets and violations in response to building and zoning code infractions.`;
    const complaintBody = `Various types of complaints can be made through the 311 website and phone line, and through the Department of Public Health.`;


    return (
        <div className={'contentWrapper'}>
            <AddressBanner parcel={parcel} />

            <RentalCard parcel={parcel} />

            <InfractionCard 
                parcelpin={parcel.parcel}
                title={'Code Infractions'}
                body={codeInfractionBody}
                cardSpecs={enforcement}
            />

            <InfractionCard 
                parcelpin={parcel.parcel}
                title={'Complaints'}
                body={complaintBody}
                cardSpecs={complaints}
            />

            <div className={styles.parcelInfoHeaderWrapper}>
                <h1>Ownership</h1>
                <div className={styles.parcelInfoHeader}>
                    {infoBoxes.map((row) => ( 
                        <ParcelInfoHeaderBox 
                            key={row[0]}
                            label={row[0]}
                            value={row[1]}
                        />
                    ))}            
                </div>
            </div>
        </div>
    )
}
