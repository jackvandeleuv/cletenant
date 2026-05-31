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
    console.log(parsed)

    try {
        setSuggestions(await getSuggestionsByAddress(input, parsed));
        setSuggestionsLoading(false);
        setSuggestionsHidden(false);
    } catch (err) {
        setSuggestionsLoading(false);
        setSuggestionsHidden(true);
    }
}