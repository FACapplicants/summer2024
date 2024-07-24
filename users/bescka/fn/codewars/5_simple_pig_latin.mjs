// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

// First attempt
export function pigIt(str){
    let arr = str.split(' ');
    for (let i=0;i<arr.length; i++) {
        const re = /\w+/g;
        let word = String(arr[i].match(re))
        if (word) {
            let pig = word.slice(1) + word.charAt(0) + 'ay'; 
            arr[i] = arr[i].replace(word, pig);
        }
    }
    return arr.join(' ');
};


const x = pigIt('Pig! Latin Is Cool');
console.log(x)


// top answer review: 
function pigItTop(str){
  return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")
}
// way better: 
// \$2 puts capture group 2 at the beginning (one or more instances of alphanumeric and _ AFTER the first \w), then puts capture group 1 after with "ay", then puts either the space or the end of the word there. 
//
// https://regexlearn.com/learn/regex101
