import Suggestion from "../Suggestion/Suggestion";
import styles from './SuggestionsBox.module.css';

function SuggestionsBox({ suggestions, loading }) {
    const boxClass = loading ? styles.suggestionBoxSkeleton : styles.suggestionBox;
    
    return (
        <div className={boxClass}>
            {!loading && suggestions.map((suggestion) => 
                <Suggestion
                    key={suggestion.parcel}
                    suggestion={suggestion} 
                />
            )}
        </div>
    )
}

export default SuggestionsBox;