import { getComplaints311 } from "@/app/utils/fetchData";
import PageSelectorButtonWrapper from "../../components/PageSelectorButton/PageSelectorButtonWrapper";
import styles from '../parcelpin.module.css';
import Complaint311Card from "./Complaint311Card";

export default async function Complaints311Page({ params }) {
    console.log('params')
    console.log(await params);
    const { parcelpin } = await params;
    console.log('parcelpin')
    console.log(parcelpin)
    // const parcel = (await getParcel(parcelpin))[0];

    const records = await getComplaints311(parcelpin);
    
    // records.sort((a, b) => 
    //     ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    // );
    // for (let i = 0; i < records.length; i++) {
    //     records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
    // }

    return (
        <>
            <PageSelectorButtonWrapper
                currentRoute={'complaints-311'}
                parcelpin={parcelpin}
            />

            <div className={'contentWrapper'}>
                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total 311 Complaints: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        If violations exist, the City of Cleveland issues violation notices, giving the property owner time to make corrections.
                        Click "more" to see the official records on the City's Accela Citizen Access site.
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