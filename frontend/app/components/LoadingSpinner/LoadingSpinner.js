import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
    return (
        <div className={styles.morePageLoaderWrapper}>
            <span className={styles.loader}>
            </span>
        </div>
    )
}