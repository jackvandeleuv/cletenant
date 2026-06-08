import { getComplaints311, getParcel } from "@/app/utils/fetchData";
import styles from '../parcelpin.module.css';
import Complaint311Card from "./Complaint311Card";
import { convertDateObjectToLabel, parcelObjToAddressLabel } from "@/app/utils/utilities";
import { logPageVisited } from "@/app/utils/analytics";
import AddressBanner from "@/app/components/AddressBanner/AddressBanner";
import FooterSpacer from "@/app/components/FooterSpacer/FooterSpacer";

export async function generateMetadata({ params }) {
    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    const shortAddress = parcelObjToAddressLabel(parcel);

    const recordCount = parcel.complaints_311;
    const plural = recordCount !== 1;
    const to_be = plural ? 'were' : 'was';
    const s = plural ? 's' : '';

    return {
        title: `311 Complaints | ${shortAddress}`,
        description: `There ${to_be} ${recordCount} complaint${s} made about ${shortAddress} through the 311 system.`,
        alternates: {
            canonical: `parcel/${parcelpin}/complaints-311`,
        },
    }
}

export default async function Complaints311Page({ params }) {
    const { parcelpin } = await params;

    const recordsPromise = getComplaints311(parcelpin);
    const parcelPromise = getParcel(parcelpin);
    const parcel = (await parcelPromise)[0];
    const records = await recordsPromise;

    // logPageVisited(parcelpin, 'complaints_311');
    
    records.sort((a, b) => 
        ((new Date(b.requested_datetime)).getTime() - (new Date(a.requested_datetime)).getTime())
    );
    for (let i = 0; i < records.length; i++) {
        records[i].requested_datetime = convertDateObjectToLabel(new Date(records[i].requested_datetime));
    }

    return ( 
        <div className={'contentWrapperOuter'}>
            <div className={'contentWrapper'}>
                <AddressBanner parcel={parcel} />

                <div className={styles.recordPageHeader}>
                    <h1 className={styles.recordPageHeaderCount}>
                        Total 311 Complaints: {records.length}
                    </h1>
                    <p className={styles.recordPageHeaderDescription}>
                        The City of Cleveland accepts complaints about rental and building quality through its <a style={{textDecoration: 'underline'}} target="_blank" href="https://www.clevelandohio.gov/311/building-housing">311 website</a> and phone line.
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

                <FooterSpacer />
            </div>
        </div>
    )
}