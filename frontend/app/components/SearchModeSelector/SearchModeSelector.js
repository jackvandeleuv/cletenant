import styles from './SearchModeSelector.module.css';

export default function SearchModeSelector() {
    return (
        <div className={styles.selectorWrapper}>
            <select>
                <option value="addresses">Addresses</option>
                <option value="owners">Owners</option>
            </select>
        </div>
    )
}