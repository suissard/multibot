const objectHaveEntries = (obj, entries) => {
    if (!obj) {
        console.error('objectHaveEntries', obj, entries);
        throw new Error('Object is undefined', obj, entries);
    }
    for (const [entrie, value] of Object.entries(entries)) {
        if (typeof value === 'string') {
            if (typeof obj[entrie] !== value) {
                console.error('error', entrie, `${value} => ${typeof obj[entrie]}`);
                return false;
            }
        } else if (!objectHaveEntries(obj[entrie], value)) return false;
    }
    return true;
};

module.exports = objectHaveEntries;