import PageSelectorButton from './PageSelectorButton';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorNarrow({ buttonsHidden, setButtonsHidden, currentRoute, pagesSpec, q, parcelpin }) {
    const currentLabel = pagesSpec.filter((row) => row[0] === currentRoute).pop()[1];
    const pagesSpecMod = pagesSpec.filter((row) => row[0] !== currentRoute);
    
    return (
        <div 
            className={styles.pageSelectorWrapper}
            onClick={(() => setButtonsHidden(!buttonsHidden))}
        >
            <button className={styles.pageSelector}>
                <p className={styles.pageSelectorCurrentLabel}>
                    {currentLabel}
                </p>
                <svg 
                    className={styles.pageSelectorButtonIcon} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960"
                >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
            </button>
            <div className={`${styles.pageSelectorButtonWrapper} ${buttonsHidden ? 'hidden': ''}`}>
                {pagesSpecMod.map((spec) => 
                    <PageSelectorButton
                        key={spec[0]}
                        parcelpin={parcelpin}
                        q={q}
                        buttonLabel={spec[1]}
                        buttonRoute={spec[0]}
                    >
                        {spec[1]}
                    </PageSelectorButton>
                )}
            </div>
        </div>
    )
}