const fs = require('fs')
const lexer = require('./lexer')
const parse = require('./parse')
const stop = require('prompt-sync')()

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
        debug.show()
        parse.parse(token)
    } catch {
        
    }
} run()
stop(':exit:')