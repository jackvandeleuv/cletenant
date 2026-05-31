// const pattern = /\s*(\d{0,6}\s+)(N\s|S\s|E\s|W\s)*(NORTH\s|SOUTH\s|EAST\s|WEST\s)*(.*?)(\sST|\sAVE|\sBLVD|\sRD)*.*/;
// const clean = string.toUpperCase();
// const start = clean.split('CLEVELAND', 1)[0];
// const matches = start.match(pattern);
// console.log(matches);

const CITY_STRING = 'CLEVELAND';

//                 i
// 12345 MAIN ST CLEVELAND OHIO

function findSubStringStartIdx(string, substring) {
    let j = 0;
    let start = -1;
    for (let i = 0; i < string.length; i++) {
        if (j === substring.length - 1) {
            return start;  // Found the whole substring.
        }

        if (string[i] === substring[j]) {
            if (j === 0) {  
                start = i;
            }
            j += 1;
        } else {
            if (j !== 0) {
                return start;  // Found part of the substring.
            }
        }
    }

    // String ended. Might have found something or not.
    return start;
}



const TESTS = [
    // '12345 CLEVELAND OHIO',
    // 'CLEVELAND',
    // 'CLEV',
    // 'CLEV 1234',
    // '',
    // '1300 w 9th st cleveland ohio',
    // '75-65 erieview',
    // '75 erieview cle',
    '75 clearview rd',
    '1300 w',
    '1400 west',
    '  1400 west ',
    '1300 w ',
    '12345 rd west cleveland',
    '1400 w 9th st',
    '1400 west 9th st ',
    '1400 west 9th street cleveland ohio 44113',
    '1400 west 9th dir cleveland ohio 44113',
    '1400 west 9th ct cleveland ohio 44113',
]

function splitOffSubstringFromEnd(string, substring) {
    const wholeSubstringStart = string.indexOf(substring);
    if (wholeSubstringStart !== -1) {
        return string.slice(0, wholeSubstringStart);
    }

    for (let i = substring.length - 1; i > 0; i--) {
        const substringSlice = substring.slice(0, i);
        const partialSubstringStart = string.indexOf(substringSlice);
        if (partialSubstringStart !== -1) {
            return string.slice(0, partialSubstringStart);
        }
    }
}

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

export function test() {
    for (const test of TESTS) {
        const string = test.toUpperCase();

        console.log(`\ntesting: '${string}'`);

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

        console.log(`STREET NUMBER:  ${streetNumber.trim()}`);
        console.log(`STREET DIR:     ${streetDir.trim()}`);
        console.log(`STREET:         ${streetName.trim()}`);
        console.log(`STREET TYPE:    ${streetType.trim()}`);

    }
}