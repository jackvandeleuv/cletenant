import './Suggestion.css'

function Suggestion({ suggestion, setCurrentPage, setCurrentParcel, set }) {

    const handleButtonClick = async () => {
        // const parcel = await getParcel(suggestion.parcel);
        // setParcelPageParcelState(parcel[0]);
        // toggleSuggestionDropdownVisible();
        // renderParcelPage();
    }

    return (
        <button className="parcelSuggestion" id={suggestion.parcel} onClick={handleButtonClick}>
            <svg className="parcelSuggestionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <div className="parcelSuggestionContent">
                <h3>{suggestion.par_addr_all}</h3>
                <h4>Parcel {suggestion.parcel}</h4> 
            </div>
        </button>  
    )
}

export default Suggestion;