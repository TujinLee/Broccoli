function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}

function isExitNullValue(obj: Record<string, string>) {
    return Object.values(obj).some(val => !val)
}

export {
    isEmptyObject,
    isExitNullValue
};
