import Image from 'next/image';
import styles from './SurveyCard.module.css';
import { parcelObjToAddressLabel } from '@/app/utils/utilities';
import Link from 'next/link';

export default function SurveyCard({ parcel }) {
    if (!parcel.survey2022_grade) {
        return (<></>);
    }

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