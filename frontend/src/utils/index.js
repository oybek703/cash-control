export function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object))
}

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '{}')
}

export function catchError(e) {
    const {response = {}} = e
    const {data = {}} = response
    const {detail} = data
    return detail || e.message
}