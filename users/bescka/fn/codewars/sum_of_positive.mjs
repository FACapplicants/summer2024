// in an array, return the sum of all positive numbers

const array_list = [
    [1,2,3,4,5],
    [1, -4, 7, 12], 
    [-4, -6.5, 10, 11], 
    [100, -2, 0, 1]
]

// First Attempt
// works in console not in codewars: good excuse to actually look testing! 
// update: was using number<0 not number>0 \u{1F622} \u{1F633} :P
function positiveSum(array) {
    let result = 0;
    array.forEach((number) => {
        result += number>0 ? number : 0;
    })
return result;
}

array_list.forEach((array) => {   
    let positive_sum = positiveSum(array); 
    console.log(positive_sum);
});

export default positiveSum;

// Review of upvoted answers: 
// This is cool - "reduce" reduces the array to a single value. It does the same thing 
// but is much more concise. 
// it iterates over the array (in order) and applies a callback function (i.e. a function
// used as the input for another function) 
// this callback function "accumulates" a result on to the "accumulator", 
// syntax: 
// array.reduce((accumulator, currentvalue) => accumulator + currentValue, initialValue)
function positiveSum_upvoted(arr) {
    return arr.reduce((a,b)=> a + (b > 0 ? b : 0),0);
 }
 // so here, 'a' is the accumulator, which accumulates the callbacks return values
 // 'a' starts with 0 as the initial value
 // 'b' is the current value being processed in the array and similar to above
 // just applies a ternary operator. 





