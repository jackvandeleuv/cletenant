import { getCivilTickets } from "@/app/utils/fetchData";
import PageSelectorButtonWrapper from "../../components/PageSelectorButton/PageSelectorButtonWrapper";
import styles from '../parcelpin.module.css';
import CivilTicketsCard from "./CivilTicketCard";
import { convertDateObjectToLabel } from "@/app/utils/utilities";

export default async function CivilTicketsPage({ params }) {
    const { parcelpin } = await params;
    const records = await getCivilTickets(parcelpin);

    records.sort((a, b) => 
        ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
        records[i].file_date = convertDateObjectToLabel(new Date(records[i].file_date));
    }

    return (
        <>
            <div className={'contentWrapper'}>
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
        </>
    )
}