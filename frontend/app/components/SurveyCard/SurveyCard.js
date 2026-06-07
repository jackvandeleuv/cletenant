import Image from 'next/image';
import styles from './SurveyCard.module.css';
import { parcelObjToAddressLabel } from '@/app/utils/utilities';
import Link from 'next/link';

export default function SurveyCard({ parcel }) {
    if (!parcel.survey2022_grade) {
        return (<></>);
    }

    // {
    // "parcel": "10134044",
    // "par_addr_all": "65-75 ERIEVIEW PLAZA NO SUFFIX, CLEVELAND, OH, 44114",
    // "parcel_owner": "ALTO 55 ERIEVIEW LLC",
    // "std_deeded_owner": "ALTO 55 ERIEVIEW LLC",
    // "grantor": "BZT ACQUISITION, LLC",
    // "grantee": "ALTO 55 ERIEVIEW LLC",
    // "last_transfer_date": 1495557960000,
    // "tax_assessed_total": 1499060,
    // "activerentalregistrationflag": 0,
    // "activecertificateapprovingrentaloccupancyflag": 0,
    // "leadsafecertificateactiveflag": 0,
    // "transfers_in_5y": 0,
    // "myplacelink": "https://myplace.cuyahogacounty.gov/MTAxMzQwNDQ=?city=OTk=&searchBy=UGFyY2Vs&dataRequested=UHJvcGVydHkgU3VtbWFyeSBSZXBvcnQ=",
    // "survey2022_grade": "A",
    // "survey2022_photolink": "https://wdwot.s3.amazonaws.com/blextoid/636d0f1ec0338107abbfdae3/206376a9357ff6c4.jpg?t=1668091676",
    // "taxdelinquencyamount": 0,
    // "max_age": 0,
    // "min_age": 0,
    // "min_com_age": 1968,
    // "max_com_age": 1968,
    // "owner_clean": "ALTO 55 ERIEVIEW LLC",
    // "civil_tickets": 1,
    // "complaints_health": 3,
    // "code_violations": 14,
    // "complaints_311": 0,
    // "parcel_addr_min": 65,
    // "parcel_addr_max": 75,
    // "parcel_predir": null,
    // "parcel_street": "ERIEVIEW PLAZA",
    // "parcel_suffix": null,
    // "parcel_unit": null,
    // "neighborhood": "Downtown",
    // "owner_id": "SMl2RQ1XmAd9",
    // "survey2022_grade_num": 4
    // }

    const parcelLabel = parcelObjToAddressLabel(parcel);
    const altText = `2022 survey photo for ${parcelLabel}`;

    // All colors are tailwind 300.
    const prefixMap = new Map([
        [
            'A', 
            {
                prefix: 'an',
                color: 'oklch(87.1% 0.15 154.449)',
            },
        ],
        [
            'B', 
            {
                prefix: 'a',
                color: 'oklch(85.5% 0.138 181.071)',
            },
        ],
        [
            'C', 
            {
                prefix: 'a',
                color: 'oklch(87.9% 0.169 91.605)',
            },
        ],
        [
            'D', 
            {
                prefix: 'a',
                color: 'oklch(83.7% 0.128 66.29)',
            },
        ],
        [
            'F', 
            {
                prefix: 'an',
                color: 'oklch(80.8% 0.114 19.571)',
            },
        ],
    ])

    if (!prefixMap.has(parcel.survey2022_grade)) {
        return (<></>);
    }

    const spec = prefixMap.get(parcel.survey2022_grade);

    return (
        <div className={styles.surveyCard}>
            <a 
                className={styles.photoLinkWrapper}
                href={parcel.survey2022_photolink} 
                target="_blank"
                rel="noopener noreferrer"
            >
                <img 
                    className={styles.parcelImage} 
                    src={parcel.survey2022_photolink} 
                    alt={'Link to full-screen 2022 property survey photo.'}
                />
            </a>
            <div className={styles.surveyCardBody}>
                <div 
                    className={styles.gradeBadge}
                    style={{'backgroundColor': spec.color}}
                >
                    {parcel.survey2022_grade}             
                </div>
                <div className={styles.gradeMessage}>
                    <h1>
                        Property Survey Grade
                    </h1>
                    <p>
                        In 2022, the City of Cleveland and the Western Reserve Land Conservancy 
                        surveyed this property and gave it a condition grade of {parcel.survey2022_grade} on an A-F scale.
                    </p>
                </div>
            </div>
        </div>
    )
}