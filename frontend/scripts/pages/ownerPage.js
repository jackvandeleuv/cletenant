export function renderOwnerPage() {
    console.log(owner)
    document.getElementById('searchWrapper').innerHTML = owner;
}

export function setOwnerPageOwner(update) {
    owner = structuredClone(update);
}

let owner = null;