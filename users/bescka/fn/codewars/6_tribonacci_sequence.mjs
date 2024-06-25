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

// upvoted answer review
// found it hard to improve on upvoted 1 - tried 
// e.g. n = Math.max(0, n-3), or m = n<3? n, n-3
// computationally the redundancy from always computing
// i, i+1, i+2 is slightly unsatisfying, but looks great
export function tribonacci_upvote1(signature, n){
  for (let i = 0; i < n-3; i++) {
    signature.push(
      signature[i] + 
      signature[i+1] + 
      signature[i+2]);
  }
  return signature.slice(0,n)
}

// export function tribonacci_attempt2(signature, n){
//   i = signature.length
//   while (i < Math.max(n-3)) {
//     signature.push(
//       signature[i] + 
//       signature[i+1] + 
//       signature[i+2]);
//   }
//   return signature
// }


// function test(signature, n){
//   let i = n - 3
//   let j = 0
//   while (i + j < n) {
//     signature.push(signature.slice())
//   }
// }


  // upvoted 2: 
  function tribonacci_upvote2(signature,n) {
    const result = signature.slice(0, n);
    while (result.length < n) {
      result[result.length] = result.slice(-3).reduce((p,c) => p + c, 0);
    }
    return result;
  }