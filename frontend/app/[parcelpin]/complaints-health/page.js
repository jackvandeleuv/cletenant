import { getComplaintsHealth, getParcel } from "@/app/utils/fetchData";
import styles from '../parcelpin.module.css';
import ComplaintHealthCard from "./ComplaintHealthCard";
import { convertDateObjectToLabel } from "@/app/utils/utilities";
import { logPageVisited } from "@/app/utils/analytics";
import AddressBanner from "@/app/components/AddressBanner/AddressBanner";

export default async function ComplaintsHealthPage({ params }) {
    const { parcelpin } = await params;

    const recordsPromise = getComplaintsHealth(parcelpin);
    const parcelPromise = getParcel(parcelpin);
    const parcel = (await parcelPromise)[0];
    const records = await recordsPromise;

    // logPageVisited(parcelpin, 'complaints_health');

    records.sort((a, b) => 
        ((new Date(b.submit_date)).getTime() - (new Date(a.submit_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].submit_date = convertDateObjectToLabel(new Date(records[i].submit_date));
    }

    return (
        <div className={'contentWrapper'}>
            <AddressBanner parcel={parcel} />

            <div className={styles.recordPageHeader}>
                <h1 className={styles.recordPageHeaderCount}>
                    Total Health Complaints: {records.length}
                </h1>
                <p className={styles.recordPageHeaderDescription}>
                    The Cleveland Department of Public Health accepts complaints via the City website.
                </p>
            </div>
            <div className={styles.recordCardWrapper}>
                {records.map((record, i) => (
                    <ComplaintHealthCard
                        key={`complaint_${i}`}
                        complaint={record}
                    />
                ))}
            </div>
        </div>
        
    )
}