export function camelToTitleWithSpaces(string) {
    string = string.trim();
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string.replace(/([A-Z])/g, ' $1').trim();
}
