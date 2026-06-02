import { logSuggestionsNotFound, logSuggestionsOffered, logTimeToLoadSuggestions } from "./analytics";
import { getSuggestionsByAddress } from "./fetchData";
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

export async function handleSearchInput(input, setSuggestions, setSuggestionsLoading, setSuggestionsHidden, setSearchInput) {
    const startTime = Date.now();
    
    setSearchInput(input);

    if (!input || input.trim() === '') {
        setSuggestionsLoading(false);
        setSuggestionsHidden(true);
        return;
    }

    setSuggestionsLoading(true);
    setSuggestionsHidden(false);

    await sleep(300);

    const currentInput = document.getElementById('searchBox').value;
    if (input !== currentInput) return;

    const parsed = parseAddress(input);

    try {
        const suggestions = await getSuggestionsByAddress(input, parsed);
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
        setSuggestionsLoading(false);
        setSuggestionsHidden(true);
        
        logSuggestionsNotFound(input)
    }
}