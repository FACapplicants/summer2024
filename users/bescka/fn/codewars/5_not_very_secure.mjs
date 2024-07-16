// In this example you have to validate if a user input string is alphanumeric. The given string is not nil/null/NULL/None, so you don't have to check that.
//
// The string has the following conditions to be alphanumeric:
//
// At least one character ("" is not valid)
// Allowed characters are uppercase / lowercase latin letters and digits from 0 to 9
// No whitespaces / underscores
//
//
// first attempt
export function alphanumeric_v1(string){
    const re = /[\W]|^\s*$/g;
    if (string == "") {
            return false;
    } else if (string.match(re)){
        return false;
    } else {
        return true;
    }
}

// second attempt
//
export function alphanumeric_v2(string){
    const re = /^[a-zA-Z0-9]+$/g
    return string.test(re);
}

// RegExp.test returns true or false depending on the match of the expression. 
// third attempt
export function alphanumeric(string){
    const re = /^[a-z0-9]+$/gi;
    return re.test(string);
}
