const token = require('./do')

function lexer(fileContent,tokens = token.tokens) {
    let token = ''
    let state = 0
    let string = ''
    let expr = ''
    let varStar = 0
    let vari = ''
    let isExpr = 0
    const fileContents = fileContent.split('')
    for (char of fileContents) {
        token += char
        if (token == ' ') {
            if (state == 0) {
                token = ''
            } else if (state == 1) {
                token = ' '
            }
        } else if (token == '\n' || token == '\r' || token == '<end>') {
            if (expr != '' && isExpr == 1) {
                tokens.push(`expr:${expr}`)
                expr = ''
            } else if (expr != '' && isExpr == 0) {
                tokens.push(`num:${expr}`)
                expr = ''
            } else if (vari != '') {
                tokens.push(`var:${vari}`)
                vari = ''
                varStar = 0
            }
            token = ''
        } else if (token == '=' && state == 0) {
            if (expr != '' && isExpr == 0) {
                tokens.push(`num:${expr}`)
                expr = ''
            } 
            if (vari != '') {
                tokens.push(`var:${vari}`)
                vari = ''
                varStar = 0
            }
            if (tokens[tokens.length - 1] === 'equal') {
                tokens[tokens.length - 1] = 'eqeq'
            } else {
                tokens.push('equal')
            }
            token = ''
        } else if (token == '$' && state == 0) {
            varStar = 1
            vari += token
            token = ''
        } else if (varStar == 1) {
            if (token == '<' || token == '>') {
                if (vari != '') {
                    tokens.push(`var:${vari}`)
                    vari = ''
                    varStar = 0
                } vari += token
                token = ''
            }
            vari += token
            token = ''
        } else if (token == 'out') {
            tokens.push('out')
            token = ''
        } else if (token == 'endif') {
            tokens.push('endif')
            token = ''
        } else if (token == 'if') {
            tokens.push('if')
            token = ''
        } else if (token == '~') {
            if (expr != '' && isExpr == 0) {
                tokens.push(`num:${expr}`)
                expr = ''
            } 
            tokens.push('then')
            token = ''
        } else if (token == 'input') {
            tokens.push('input')
            token = ''
        } else if (token == '0' || token == '1' || token == '2' || token == '3' || token == '4'
        || token == '5' || token == '6' || token == '7' || token == '8' || token == '9') {
            expr += token
            token = ''
        } else if (token == '+') {
            isExpr = 1 
            expr += token
            token = ''
        } else if (token == '\t') {
            token = ''
        } else if (token == 'true' || token == 'false') {
            tokens.push('bool:'+token)
            token = ''
        } else if (token == '\"' || token == ' \"') {
            if (state == 0) {
                state = 1
            } else if (state == 1) {
                tokens.push(`string:${string}"`)
                string = ''
                state = 0
                token = ''
            }
        } else if (state == 1) {
            string += token
            token = ''
        }
    }
    // return ''
    console.log(tokens)
    return tokens
}

module.exports.lexer = lexer