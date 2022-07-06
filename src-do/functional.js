const varList = require('./do')
const prompt = require('prompt-sync')()

function doOut(out) {
    if (out.slice(0,6) == 'string') {
        out = out.slice(8)
        out = out.slice(undefined,-1)
    } else if (out.slice(0,3) == 'num') {
        out = out.slice(4)
    } else if (out.slice(0,4) == 'expr') {
        out = eval(out.slice(5))
    } else if (out.slice(0,4) == 'bool') {
        out = eval(out.slice(5))
    }
    console.log(out)
}
module.exports.doOut = doOut

function assign(varName,value) {
    varList.varList[String(varName.slice(4))] = value
}
module.exports.assign = assign

function getVar(varName) {
    varName = varName.slice(4)
    if (varName in varList.varList === true) {
        return varList.varList[varName]
    } else {
        return `VarError: undifined var '${varName}'`
    }
}
module.exports.getVar = getVar

function getInput(string,varName) {
    const i = prompt(string.slice(1,-1))
    varList.varList[varName] = `string:"${i}"` 
}
module.exports.getInput = getInput
