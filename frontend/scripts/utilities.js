export function convertUnixDateToLabel(unix) {
    if (!unix) return 'None';
    const dateObj = new Date(unix);
    return convertDateObjectToLabel(dateObj);
}

export function convertDateObjectToLabel(dateObj) {
    if (!dateObj) return 'None';
    return `
        ${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}
    `.trim();
}

export function updateContentWrapper(html) {
    const contentWrapper = document.getElementById('contentWrapper');
    contentWrapper.innerHTML = html;
}