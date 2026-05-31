import { getComplaintsHealth } from "@/app/utils/fetchData";
import PageSelectorButtonWrapper from "../../components/PageSelectorButton/PageSelectorButtonWrapper";
import styles from '../parcelpin.module.css';
import ComplaintHealthCard from "./ComplaintHealthCard";

export default async function ComplaintsHealthPage({ params }) {
    const { parcelpin } = await params;

    const records = await getComplaintsHealth(parcelpin);
    console.log(records)

    return (
        <>
            <PageSelectorButtonWrapper
                currentRoute={'complaints-health'}
                parcelpin={parcelpin}
            />

            <div className={'contentWrapper'}>
                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total Health Complaints: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        If violations exist, the City of Cleveland issues violation notices, giving the property owner time to make corrections.
                        Click "more" to see the official records on the City's Accela Citizen Access site.
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
        </>
    )
}