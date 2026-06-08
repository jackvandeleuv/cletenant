import { getParcel, getViolations } from "@/app/utils/fetchData";
import styles from '../parcelpin.module.css';
import ViolationCard from "./ViolationCard";
import { convertDateObjectToLabel, parcelObjToAddressLabel } from "@/app/utils/utilities";
import { logPageVisited } from "@/app/utils/analytics";
import AddressBanner from "@/app/components/AddressBanner/AddressBanner";
import FooterSpacer from "@/app/components/FooterSpacer/FooterSpacer";

export async function generateMetadata({ params }) {
    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    const shortAddress = parcelObjToAddressLabel(parcel);

    const recordCount = parcel.code_violations;
    const plural = recordCount !== 1;
    const to_be = plural ? 'were' : 'was';
    const s = plural ? 's' : '';

    return {
        title: `Violations | ${shortAddress}`,
        description: `There ${to_be} ${recordCount} known code violation${s} at ${shortAddress}.`,
        alternates: {
            canonical: `parcel/${parcelpin}/violations`,
        },
    }
}

export default async function ViolationPage({ params }) {
    const { parcelpin } = await params;

    // logPageVisited(parcelpin, 'violations');

    const recordsPromise = getViolations(parcelpin);
    const parcelPromise = getParcel(parcelpin);
    const parcel = (await parcelPromise)[0];
    const records = await recordsPromise;

    records.sort((a, b) => 
        ((new Date(b.issue_date)).getTime() - (new Date(a.issue_date)).getTime())
    );

    for (let i = 0; i < records.length; i++) {
        records[i].issue_date = convertDateObjectToLabel(new Date(records[i].issue_date));
    }

    return (
        <div className={'contentWrapperOuter'}>
            <div className={'contentWrapper'}>
                <AddressBanner parcel={parcel} />

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

                <FooterSpacer />
            </div>
        </div>
    )
}