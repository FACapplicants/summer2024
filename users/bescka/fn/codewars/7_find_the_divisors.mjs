// Create a function named divisors/Divisors that takes an integer n > 1 and 
// returns an array with all of the integer's divisors(except for 1 and the 
// number itself), from smallest to largest. If the number is prime return 
// the string '(integer) is prime' (null in C#, empty table in COBOL) 
// (use Either String a in Haskell and Result<Vec<u32>, String> in Rust).
//

// first attempt
// idea: 
//  Basic would be just x = 2 Do modulo 2 check remainder 
export function divisors(integer) {
    let divArr = [];
    let div = 2;
    for (div; div <= integer/2; div++) {
        if (integer % div === 0) {
            divArr.push(div)
        };
    };
    if (!divArr.length) {
        return `${integer} is prime`
    } else {
        return divArr
    };
};


// review of upvoted: 
export function divisorsUpvoted(integer) {
    var res = []
    for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
    return res.length ? res : integer + ' is prime'
  };
// super clean use of the ternary operator. would probably suggest terseness in 
// also better variable naming
// condensed lines sacrifices some readability so perhaps: 
export function divisorsUpvoted_v2(integer) {
    var res = [];
    for (var i = 2; i <= Math.floor(integer / 2); ++i) {
      if (integer % i == 0) {
        res.push(i);
      }
    }
    return res.length ? res : integer + ' is prime';
  }
