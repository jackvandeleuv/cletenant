import Link from 'next/link';
import InfoButton from '../InfoButton/InfoButton';
import styles from './InfractionCard.module.css';

export default function InfractionCard({ parcelpin, title, body, cardSpecs }) {

    return (
        <div className={styles.overviewCard}>
            <h1>{title}</h1>
            <div className={styles.infractionCardWrapper}>
                {cardSpecs.map((card) => (
                    <Link 
                        key={card[2]}
                        href={`/${parcelpin}/${card[2]}`}
                    >
                        <div className={styles.infractionCardTitleWrapper}>
                            <h2 className={styles.infractionCardTitle}>{card[0]}</h2>
                    
                            <InfoButton message={card[3]} />
                        </div>
                        <h1 className={styles.cardMetric}>
                            {card[1]}
                        </h1>
                    </Link>
                ))}

            </div>
            <p>
                {body}
            </p>
        </div>
    )
}