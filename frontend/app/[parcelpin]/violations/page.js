import { getViolations } from "@/app/utils/fetchData";
import PageSelectorButtonWrapper from "../../components/PageSelectorButton/PageSelectorButtonWrapper";
import styles from '../parcelpin.module.css';
import ViolationCard from "./ViolationCard";
import { convertDateObjectToLabel } from "@/app/utils/utilities";

export default async function ViolationPage({ params }) {
    const { parcelpin } = await params;
    // const parcel = (await getParcel(parcelpin))[0];

    const records = await getViolations(parcelpin);
    records.sort((a, b) => 
        ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
    }

    return (
        <>
            <PageSelectorButtonWrapper
                currentRoute={'violations'}
                parcelpin={parcelpin}
            />

            <div className={'contentWrapper'}>
                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total Code Violations: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        If violations exist, the City of Cleveland issues violation notices, giving the property owner time to make corrections.
                        Click "more" to see the official records on the City's Accela Citizen Access site.
                    </p>
                </div>
                <div className={styles.recordCardWrapper}>
                    {records.map((record) => (
                        <ViolationCard 
                            key={record.record_id}
                            record={record}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}