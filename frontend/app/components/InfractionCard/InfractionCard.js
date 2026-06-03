import Link from 'next/link';
import InfoButton from '../InfoButton/InfoButton';
import styles from './InfractionCard.module.css';

export default function InfractionCard({ parcelpin, title, body, cardSpecs }) {

    return (
        <div className={styles.overviewCard}>
            <h1>{title}</h1>
            <div className={styles.infractionCardWrapper}>
                {cardSpecs.map((card) => (
                    <div className={styles.infractionCardTitleWrapper}>
                        <Link 
                            key={card[2]}
                            href={`/${parcelpin}/${card[2]}`}
                        >
                                <h2 className={styles.infractionCardTitle}>{card[0]}</h2>
                        

                            <h1 className={styles.cardMetric}>
                                {card[1]}
                            </h1>

                        </Link>

                        <InfoButton message={card[3]} />
                    </div>
                ))}

            </div>
            <p>
                {body}
            </p>
        </div>
    )
}