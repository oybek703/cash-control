import moment from 'moment'
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

export function withToken() {
    const {token} = getFromLocalStorage('user')
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ''}`
        }
    }
}

export function getAmounts(array) {
    return array.map(v => v['amount'])
}

export function getTypes(array) {
    return array.map(v => v['type'])
}

export function getTimes(array, key='payed_at', is_daily) {
    return array.
    map(v => moment().format( is_daily ? 'hh:mm:ss' : "DD MM YYYY hh:mm:ss"))
}

export function getDataArrays(data = [], time_key, is_daily = false) {
    const amounts = getAmounts(data)
    const types = getTypes(data)
    const times = getTimes(data, time_key, is_daily)
    return {amounts, types, times}
}