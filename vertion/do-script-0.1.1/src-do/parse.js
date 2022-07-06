const fun = require('./functional')

function parse(token) {
    let i = 0
    while(i<token.length) {
        if (token[i] == 'endif') {
            i += 1
        } else if (token[i] + ' ' + token[i+1].slice(0,6) == 'out string' ||
        token[i] + ' ' + token[i+1].slice(0,3) == 'out num' ||
        token[i] + ' ' + token[i+1].slice(0,4) == 'out expr' ||
        token[i] + ' ' + token[i+1].slice(0,4) == 'out bool' ||
        token[i] + ' ' + token[i+1].slice(0,3) == 'out var') {
            if (token[i+1].slice(0,6) == 'string') {
                fun.doOut(token[i+1])
            } else if (token[i+1].slice(0,3) == 'num') {
                fun.doOut(token[i+1])
            } else if (token[i+1].slice(0,4) == 'expr') {
                fun.doOut(token[i+1])
            } else if (token[i+1].slice(0,4) == 'bool') {
                fun.doOut(token[i+1])
            } else if (token[i+1].slice(0,3) == 'var') {
                fun.doOut(fun.getVar(token[i+1]))
            }
            i+=2
        } if (token[i].slice(0,3) + ' ' + token[i+1] + ' ' + token[i+2].slice(0,6) == 'var equal string'
        || token[i].slice(0,3) + ' ' + token[i+1] + ' ' + token[i+2].slice(0,3) == 'var equal num'
        ||token[i].slice(0,3) + ' ' + token[i+1] + ' ' + token[i+2].slice(0,4) == 'var equal expr'
        ||token[i].slice(0,3) + ' ' + token[i+1] + ' ' + token[i+2].slice(0,4) == 'var equal bool'
        ||token[i].slice(0,3) + ' ' + token[i+1] + ' ' + token[i+2].slice(0,3) == 'var equal var'
         ) {
            // fun.assign(token[i],token[i+2])             
            if (token[i+2].slice(0,6) == 'string') {
                fun.assign(token[i],token[i+2])
            } else if (token[i+2].slice(0,3) == 'num') {
                fun.assign(token[i],token[i+2])
            } else if (token[i+2].slice(0,4) == 'expr') {
                fun.assign(token[i],'num:'+eval(token[i+2]))
            } else if (token[i+2].slice(0,4) == 'bool') {
                fun.assign(token[i],token[i+2].slice(5))
            } else if (token[i+2].slice(0,3) == 'var') {
                fun.assign(token[i],fun.getVar(token[i+2]))
            }
            i += 3
        } else if (token[i] + ' ' + token[i+1].slice(0,6) + ' ' + token[i+2].slice(0,3) == 'input string var') {
            fun.getInput(token[i+1].slice(7),token[i+2].slice(5))
            i+=3
        } else if (token[i] + ' ' + token[i+1].slice(0,3) + ' ' + token[i+2] + ' ' + token[i+3].slice(0,3)
        + ' ' + token[i+4] == 'if num eqeq num then') {
            if (token[i+1].slice(4) == token[i+3].slice(4)) {
                
            } else {
                i+=2
            }
            i+=5
        }
    }
}

module.exports.parse = parse