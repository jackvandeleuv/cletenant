import styles from "./SuggestionsBox.module.css";

export default function SuggestionBoxSkeleton() {
    return (
        <div className={styles.panel}>
            <div className={styles.list}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div className={styles.item} key={index}>
                        <div className={styles.content}>
                            <div className={`${styles.skeleton} ${styles.line} ${styles.lineLong}`} />
                            <div className={`${styles.skeleton} ${styles.line} ${styles.lineMedium}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}