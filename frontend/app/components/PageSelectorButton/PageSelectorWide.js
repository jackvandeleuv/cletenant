import PageSelectorButtonWide from './PageSelectorButtonWide';
import styles from './PageSelectorButton.module.css';

export default function PageSelectorWide({ buttonsHidden, currentRoute, pagesSpec, q, parcelpin }) {
    // const currentLabel = pagesSpec.filter((row) => row[0] === currentRoute).pop()[1];
    const pagesSpecMod = [];
    for (const spec of pagesSpec) {
        const specCopy = [...spec];
        specCopy.push(spec[0] === currentRoute);
        pagesSpecMod.push(specCopy);
    }

    return (
        <div 
            className={styles.pageSelectorWrapperWide}
        >
            <div className={`${styles.pageSelectorButtonWrapperWide} ${buttonsHidden ? 'hidden': ''}`}>
                {pagesSpecMod.map((spec) => 
                    <PageSelectorButtonWide
                        key={spec[0]}
                        parcelpin={parcelpin}
                        q={q}
                        buttonLabel={spec[1]}
                        buttonRoute={spec[0]}
                        currentPage={spec[2]}
                    >
                        {spec[1]}
                    </PageSelectorButtonWide>
                )}
            </div>
        </div>
    )
}