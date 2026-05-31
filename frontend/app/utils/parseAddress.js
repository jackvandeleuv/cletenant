function splitOffLeadingSubstring(string, pattern) {
    const matches = string.match(pattern);
    if (matches) {
        const substring = matches[1];
        const matchIdx = string.indexOf(substring);
        return [
            substring, 
            string.slice(matchIdx + substring.length, string.length)
        ];
    } else {
        return ["", string];
    }
}

function splitOffTrailingSubstring(string, gpattern) {
    const matchIterator = string.matchAll(gpattern);
    const matches = [];
    for (const elem of matchIterator) {
        matches.push(elem[1]);
    }

    if (matches.length > 0) {
        const substring = matches[matches.length - 1];
        const matchIdx = string.lastIndexOf(substring);
        return [
            string.slice(0, matchIdx),
            substring, 
        ];
    } else {
        return [string, ""];
    }
}

const STREET_DIR_MAP = new Map([
    ['N', 'NORTH'],
    ['S', 'SOUTH'],
    ['E', 'EAST'],
    ['W', 'WEST'],
]);

const REMAP_SUFFIX = new Map([
    ['ROW', 'ROW'],
    ['TER', 'TERRACE'],
    ['SQ', 'SQUARE'],
    ['PK', 'PARKWAY'],
    ['PKWAY', 'PARKWAY'],
    ['CIR', 'CIRCLE'],
    ['PKWY', 'PARKWAY'],
    ['LN', 'LANE'],
    ['PL', 'PLACE'],
    ['CT', 'COURT'],
    ['BLVD', 'BOULEVARD'],
    ['DR', 'DRIVE'],
    ['RD', 'ROAD'],
    ['ST', 'STREET'],
    ['AVE', 'AVENUE'],
    ['BLV', 'BOULEVARD'],
    ['BVD', 'BOULEVARD'],
]);

export function parseAddress(input) {
    const string = input.toUpperCase();

    const [streetNumber, stringA] = splitOffLeadingSubstring(string, /^\s*(\d{1,6})/);

    let [streetDir, stringB] = splitOffLeadingSubstring(stringA, /^(\s*(?:N|S|E|W)\s)/);
    if (streetDir === "") {
        [streetDir, stringB] = splitOffLeadingSubstring(stringA, /^(\s*(?:NORTH|SOUTH|EAST|WEST)\s)/);
        streetDir = STREET_DIR_MAP.get(streetDir) || streetDir;
    }

    let [streetName, streetType] = splitOffTrailingSubstring(
        // Pad with empty char because we only want to match cases
        // where either the street type ends the string or there is
        // at least one space after the street type.
        stringB + ' ', 
        // g flag is required to find the last match.
        /\s(ROW|TER|SQ|PK|PKWAY|CIR|PKWY|LN|PL|CT|BLVD|DR|RD|ST|AVE|BLV|BVD|ROW|TERRACE|SQUARE|PARKWAY|CIRCLE|LANE|PLACE|COURT|BOULEVARD|DRIVE|ROAD|STREET|AVENUE)\s/g
    );
    streetType = REMAP_SUFFIX.get(streetType) || streetType;

    const numericStreetName = streetName.trim().match(/^(\d{1,3})/);
    if (numericStreetName) {
        streetName = numericStreetName[1];
    }

    return {
        streetNumber: Number.parseInt(streetNumber.trim()) || '',
        streetDir: streetDir.trim(),
        streetName: streetName.trim(),
        streetType: streetType.trim(),
    }
    
}