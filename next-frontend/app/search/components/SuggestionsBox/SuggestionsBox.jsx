import Suggestion from "../Suggestion/Suggestion";
import styles from './SuggestionsBox.module.css';

function SuggestionsBox({ suggestions, displayState, setCurrentPage, setCurrentParcel }) {
    const boxHidden = displayState.hidden ? styles.hidden : '""';
    const boxClass = displayState.loading ? styles.suggestionBoxSkeleton : styles.suggestionBox;
    return (
        <div className={`${boxClass} ${boxHidden}`}>
            {!displayState.loading && suggestions.map((suggestion) => 
                <Suggestion
                    key={suggestion.parcel}
                    suggestion={suggestion} 
                    setCurrentPage={setCurrentPage}
                    setCurrentParcel={setCurrentParcel}
                />
            )}
        </div>
    )
}

export default SuggestionsBox;