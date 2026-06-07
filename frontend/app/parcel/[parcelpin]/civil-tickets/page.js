import { getCivilTickets, getParcel } from "@/app/utils/fetchData";
import styles from '../parcelpin.module.css';
import CivilTicketsCard from "./CivilTicketCard";
import { convertDateObjectToLabel, parcelObjToAddressLabel } from "@/app/utils/utilities";
import { logPageVisited } from "@/app/utils/analytics";
import AddressBanner from "@/app/components/AddressBanner/AddressBanner";

export async function generateMetadata({ params }) {
    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    const shortAddress = parcelObjToAddressLabel(parcel);

    const recordCount = parcel.civil_tickets;
    const plural = recordCount !== 1;
    const to_be = plural ? 'were' : 'was';
    const s = plural ? 's' : '';

    return {
        title: `Civil Tickets | ${shortAddress}`,
        description: `There ${to_be} ${recordCount} civil ticket${s} issued on ${shortAddress}.`,
        alternates: {
            canonical: `parcel/${parcelpin}/civil-tickets`,
        },
    }
}

export default async function CivilTicketsPage({ params }) {
    const { parcelpin } = await params;

    const recordsPromise = getCivilTickets(parcelpin);
    const parcelPromise = getParcel(parcelpin);
    const parcel = (await parcelPromise)[0];
    const records = await recordsPromise;

    // logPageVisited(parcelpin, 'civil_tickets');

    records.sort((a, b) => 
        ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
        records[i].file_date = convertDateObjectToLabel(new Date(records[i].file_date));
    }

    return (  
        <div className={'contentWrapperOuter'}>
            <div className={'contentWrapper'}>
                <AddressBanner parcel={parcel} />

                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total Civil Tickets: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        Civil tickets are building code enforcement actions which may carry financial penalties. Tickets are issued by the City of Cleveland.
                    </p>
                </div>
                <div className={styles.recordCardWrapper}>
                    {records.map((record) => (
                        <CivilTicketsCard 
                            key={record.ticket_id}
                            record={record}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}