export const getShortAddress = (address = '', num = 5, endNum = 4) => {
    const strLength = address.length;
    return address.substring(0, num) + '...' + address.substring(strLength - endNum, strLength);
};