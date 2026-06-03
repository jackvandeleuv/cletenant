import { CLIENT_SAFE_KEY, BACKEND_URL } from "./config.js"

function createSessionId() {
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = [...bytes].map(b => b.toString(16).padStart(2, "0"));

    return [
        hex.slice(0, 4).join(""),
        hex.slice(4, 6).join(""),
        hex.slice(6, 8).join(""),
        hex.slice(8, 10).join(""),
        hex.slice(10, 16).join("")
    ].join("-");
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');

    if (!sessionId) {
        sessionId = createSessionId();
        sessionStorage.setItem('session_id', sessionId);
    }

    return sessionId;
}

export function logSuggestionClick(record_id) {
    logToGoogleAnalytics('suggestion_click', { record_id: record_id });
    logToSupabase('suggestion_click', record_id);
}

export function logSuggestionsOffered(input) {
    logToGoogleAnalytics('suggestions_were_offered_for_input', { search_term: input });
    logToSupabase('suggestions_were_offered_for_input', input);
}

export function logSuggestionsNotFound(input) {
    logToGoogleAnalytics('suggestions_not_found_for_input', { search_term: input });
    logToSupabase('suggestions_not_found_for_input', input);
}

export function logTimeToLoadSuggestions(ms) {
    logToSupabase('ms_to_load_suggestions', ms);
}

export function logPageVisited(parcelpin, pageType) {
    logToSupabase(`visited_${pageType}`, parcelpin);
}

function logToGoogleAnalytics(eventName, params) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}

function logToSupabase(event_type, value) {
    const headers = {
        'apikey': CLIENT_SAFE_KEY,
        'Authorization': `Bearer ${CLIENT_SAFE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
    };

    const data = {
        "event_type": event_type, 
        "value": value, 
        "session_id": getSessionId(),
    };

    fetch(
        BACKEND_URL + '/events', {
            method: 'POST', 
            headers: headers, 
            body: JSON.stringify(data)
        }
    );
}