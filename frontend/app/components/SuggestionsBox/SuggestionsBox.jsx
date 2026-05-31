import Suggestion from "../Suggestion/Suggestion";
import SuggestionBoxSkeleton from "./SuggestionBoxSkeleton";
import styles from './SuggestionsBox.module.css';

function SuggestionsBox({ suggestions, loading, topDist, topPadding }) {
    // const boxClass = loading ? styles.suggestionBoxSkeleton : styles.suggestionBox;
    
    return (
        <div className={styles.suggestionBox} style={{top: topDist, paddingTop: topPadding}}>
            {loading && (
                <SuggestionBoxSkeleton />
            )}
            
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