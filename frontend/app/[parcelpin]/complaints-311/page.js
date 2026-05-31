import { getComplaints311 } from "@/app/utils/fetchData";
import styles from '../parcelpin.module.css';
import Complaint311Card from "./Complaint311Card";
import { convertDateObjectToLabel } from "@/app/utils/utilities";

export default async function Complaints311Page({ params }) {
    const { parcelpin } = await params;
    const records = await getComplaints311(parcelpin);
    
    records.sort((a, b) => 
        ((new Date(b.requested_datetime)).getTime() - (new Date(a.requested_datetime)).getTime())
    );
    for (let i = 0; i < records.length; i++) {
        records[i].requested_datetime = convertDateObjectToLabel(new Date(records[i].requested_datetime));
    }

    return (
        <>
            <div className={'contentWrapper'}>
                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total 311 Complaints: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        The City of Cleveland accepts complaints about rental and building quality through its 311 website and phone line.
                    </p>
                </div>
                <div className={styles.recordCardWrapper}>
                    {records.map((record) => (
                        <Complaint311Card
                            key={record.service_request_id}
                            complaint={record}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}