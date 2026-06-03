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

export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parcelObjToAddressLabel(parcel) {
    const oneNum = parcel.parcel_addr_max === parcel.parcel_addr_min;
    const parcelNum = oneNum ? `${parcel.parcel_addr_max}` : `${parcel.parcel_addr_min}-${parcel.parcel_addr_max}`
    const parcelUnit = parcel.parcel_unit ? `(${parcel.parcel_unit})` : '';

    return [
        parcelNum || '',
        parcel.parcel_predir || '',
        parcel.parcel_street || '',
        parcel.parcel_suffix || '',
        parcelUnit || '',
    ].join(' ').trim();
}