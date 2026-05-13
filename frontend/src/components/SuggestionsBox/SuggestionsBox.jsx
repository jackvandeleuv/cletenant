import Suggestion from "../Suggestion/Suggestion";

function SuggestionsBox({ suggestions, displayState, setCurrentPage, setCurrentParcel }) {
    const boxClass = displayState.hidden ? 'hidden' : '""';
    const boxID = displayState.loading ? 'suggestionBoxSkeleton' : 'suggestionBox';
    return (
        <div id={boxID} className={boxClass}>
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