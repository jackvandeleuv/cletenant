import { getViolations } from "@/app/utils/fetchData";
import PageSelectorButtonWrapper from "../../components/PageSelectorButton/PageSelectorButtonWrapper";
import styles from '../parcelpin.module.css';
import ViolationCard from "./ViolationCard";
import { convertDateObjectToLabel } from "@/app/utils/utilities";

export default async function ViolationPage({ params }) {
    const { parcelpin } = await params;

    const records = await getViolations(parcelpin);
    records.sort((a, b) => 
        ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
    }

    return (
        <>
            <div className={'contentWrapper'}>
                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total Code Violations: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        When the City finds a property in violation of building or zoning codes, a record of that violation will appear here.
                    </p>
                    <p className={styles.recordPageHeaderDescription}>
                        If violations are not corrected, the City may start legal proceedings against a property owner.
                    </p>
                    <p className={styles.recordPageHeaderDescription}>         
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