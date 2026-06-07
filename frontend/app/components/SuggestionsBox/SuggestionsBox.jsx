import Suggestion from "../Suggestion/Suggestion";
import SuggestionBoxSkeleton from "./SuggestionBoxSkeleton";
import styles from './SuggestionsBox.module.css';

function SuggestionsBox({ suggestions, loading, searchInput, topDist, topPadding, maxWidth }) {
    return (
        <div 
            className={styles.suggestionBox} 
            style={{
                top: topDist, 
                paddingTop: topPadding,
                maxWidth: maxWidth,
            }}>
            {loading && (
                <SuggestionBoxSkeleton />
            )}
            
            {!loading && suggestions.map((suggestion) => 
                <Suggestion
                    key={suggestion.parcel}
                    suggestion={suggestion} 
                    searchInput={searchInput}
                />
            )}
        </div>
    )
}

export default SuggestionsBox;