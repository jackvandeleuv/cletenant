import { logSuggestionsNotFound, logSuggestionsOffered, logTimeToLoadSuggestions } from "./analytics";
import { getSuggestionsByAddress, getSuggestionsByOwner } from "./fetchData";
import { parseAddress } from "./parseAddress";
import { sleep } from "./utilities";

export async function clearInputBox(setSuggestionsLoading, setSuggestionsHidden, setSearchInput) {
    const searchBox = document.getElementById('searchBox');
    if (!searchBox) return;
    searchBox.value = '';
    setSuggestionsLoading(false);
    setSuggestionsHidden(true);
    setSearchInput('');
    searchBox.focus();
}

export async function handleSearchInput(
    input, 
    setSuggestions, 
    setSuggestionsLoading, 
    setSuggestionsHidden, 
    setSearchInput,
    mode
) {
    const startTime = Date.now();
    
    setSearchInput(input);

    if (!input || input.trim() === '') {
        setSuggestionsLoading(false);
        setSuggestionsHidden(true);
        return;
    }

    setSuggestionsLoading(true);
    setSuggestionsHidden(false);

    const parsed = parseAddress(input);

    await sleep(300);

    console.log('slept')

    const currentInput = document.getElementById('searchBox').value;
    if (input !== currentInput) return;

    try {
        let suggestions = [];
        if (mode === 'suggestions') {
            console.log('if')
            suggestions = await getSuggestionsByAddress(input, parsed);
        } else {
            console.log('else')
            suggestions = await getSuggestionsByOwner(input, 100);
        }
        console.log(suggestions)

        const currentInput = document.getElementById('searchBox').value;
        if (input !== currentInput) return;

        setSuggestions(suggestions);
        setSuggestionsLoading(false);
        setSuggestionsHidden(suggestions.length === 0);

        logTimeToLoadSuggestions(Date.now() - startTime);

        if (!suggestions || suggestions.length === 0) {
            logSuggestionsNotFound(input)
        } else {
            logSuggestionsOffered(input);        
        } 
    } catch (err) {
        console.log(err)

        setSuggestionsLoading(false);
        setSuggestionsHidden(true);
        
        logSuggestionsNotFound(input)
    }
}