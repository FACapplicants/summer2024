// create a fibonacci function that given a signature array/list, 
// returns the first n elements - signature included of the so seeded sequence.


// first attempt
export default function tribonacci(signature, n){
    // bit of a rubbish way of dealing with n<3
    if (n < 3) {
        return signature.slice(0, n) 
    };
    for (let i = 0; i < n-3; i++) {
        let nextVal = 0;
        for (let j = signature.length - 1; j >= signature.length - 3; j--) {
            nextVal += signature[j];
        };
        signature.push(nextVal);
    };
    return signature
};

const res = tribonacci([1,1,1], 5);
console.log(res)

// upvoted 1: 
function tribonacci(signature,n){  
    for (var i = 0; i < n-3; i++) { // iterate n times
      signature.push(signature[i] + signature[i+1] + signature[i+2]); // add last 3 array items and push to trib
    }
    return signature.slice(0, n); //return trib - length of n
  }

  // upvoted 2: 
  function tribonacci(signature,n) {
    const result = signature.slice(0, n);
    while (result.length < n) {
      result[result.length] = result.slice(-3).reduce((p,c) => p + c, 0);
    }
    return result;
  }