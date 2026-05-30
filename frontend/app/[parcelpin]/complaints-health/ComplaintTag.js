import styles from '../parcelpin.module.css';

export default function ComplaintTag({ tag_name, tag_value, color }) {
    return (
        <p className={styles.healthTag} style={{backgroundColor: color}}>
            {tag_name}: {tag_value}
        </p>
    );
    
}