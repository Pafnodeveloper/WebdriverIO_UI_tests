/**
 * Функция-ждун резолва всех промисов
 * @param {*} arr массив значений 
 * @param {*} asyncCallback функция-callback, применяемая к arr
 * @returns массив элементов, удовлетворяющих условию из callback'a
 */
export async function waitAllAsync(arr, asyncCallback) {
    const promises = arr.map(asyncCallback)
    const results = await Promise.all(promises)
    return results
}