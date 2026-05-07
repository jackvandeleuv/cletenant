export async function getSuggestions(q) {
    const url = `http://127.0.0.1:5000/suggestions?q=${q}`;
    const resp = await fetch(url);
    return await resp.json();
}

export async function getParcel(parcelpin) {
    const url = `http://127.0.0.1:5000/parcel?parcelpin=${parcelpin}`;
    const resp = await fetch(url);
    return await resp.json();
}

export async function getOwner(name) {
    const url = `http://127.0.0.1:5000/owner?name=${name}`;
    const resp = await fetch(url);
    return await resp.json();
}