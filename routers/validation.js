/**
 * Função de validação para determinar de campos
 * @param {} value 
 * @param {Mensagem de erro que será laçada} msg 
 */
const existsOrError = (value, msg) => {
    if(value==null) throw msg
    if(Array.isArray(value) && value.length ===0 ) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function notExistOrError(value, msg) {
    try {
        existsOrError(value, msg)
    } catch(msg) {
        return
    }
    throw msg
}

function equalsOrError(valueA, valueB, msg) {
    if(valueA !==valueB) throw msg
}

module.exports = { existsOrError, equalsOrError, notExistOrError }