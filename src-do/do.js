const fs = require('fs')
const stop = require('prompt-sync')()
const lexer = require('./lexer')
const parse = require('./parse')

let tokens = []
let varList = {}

module.exports.tokens = tokens
module.exports.varList = varList

function readFile(fileName) {
    let data = fs.readFileSync(fileName).toString()
    data += '<end>'
    return data
}


function run() {
    try {
        const data = readFile(process.argv[2])
        const token = lexer.lexer(data)
        parse.parse(token)
    } catch {
        
    }
} run()
stop('enter to exit ')