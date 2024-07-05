// v1 idea: 
    // square root the original number, then take the 
    // integer (without the remainder), square it, then take it away 
    // from the original number. 
    // then repeat with the remainder from n - (integer**2)
export function sumOfSquares_v1(n) {
    let x = n;
    let count = 0;
    while (x > 0) {
        let y = Math.floor(Math.sqrt(x));
        let y_ps = Math.pow(y,2); 
        x = x - y_ps; 
        console.log('n = ', n, 'x = ', x, 'y= ', y, 'y_ps = ', y_ps);
        count += 1; 
    }
    return count;
}

 // v2 idea: 
    // round 1: start with the highest square lower than or equal to n 
    // then take that away from n. 
    // iterate until you get 0 remaining. Save the number of perfect squares
    // rounds 2 - m: start with the second highest sequare lower than or 
    // equal to n.
export function sumOfSquares_v2(n) { 

    function initializeSqArray(n){
            let sq_array = []
            const y = Math.floor(Math.sqrt(n));
            for (let i = y; i >= 1; i--){
                sq_array.push(i**2)
            }
            return sq_array
    };

    function getMaxSquarePosition(n) {
        for (let i = 0; i < sq_array.length; i++){
            if (sq_array[i] <= n) {
                return i
            }
        }
    }; 
    
    function returnSquareCount(n, mx) {
        let count = 0; 
        let x = n
        while (x > 0) {
            x = x - sq_array[mx];
            count += 1;
            mx = getMaxSquarePosition(x);
        }
        return count
    };

    //console.time('initializeArray');
    const sq_array = initializeSqArray(n);
    //console.timeEnd('initializeArray');
    const mx = 0;
    
    let count_arr = [];
    //console.time('iteration');
    for (let j = 0; j < sq_array.length ; j++) {
        let count_j = returnSquareCount(n, j); 
        if ([1, 2].includes(count_j)) { 
            return count_j
        } else {
            count_arr.push(count_j)
            //console.log(count_arr)
        };
    };
    //console.timeEnd('iteration')
    return Math.min(...count_arr)    
};


//v3 idea: 
// We check 1 perfect square
// then we check the perfect square and the difference
// 

// from wikipedia https://en.wikipedia.org/wiki/Square_number
// we can probably shave some time off the initialization with 
// The difference between any perfect square and its predecessor is given by the identity n**2 − (n − 1)**2 = 2n − 1

// even + odd = odd 
// odd + odd = even 
// even + even = even
// so maybe 

// Lagrange's four-square theorem states that any positive integer can be written as the sum of four or fewer perfect squares.
// A positive integer can be represented as a sum of two squares precisely if its prime factorization contains no odd powers of primes of the form 4k + 3. This is generalized by Waring's problem. 
// Squarity testing can be used as alternative way in factorization of large numbers. Instead of testing for divisibility, test for squarity: for given m and some number k, if k2 − m is the square of an integer n then k − n divides m. (This is an application of the factorization of a difference of two squares.) For example, 1002 − 9991 is the square of 3, so consequently 100 − 3 divides 9991. This test is deterministic for odd divisors in the range from k − n to k + n where k covers some range of natural numbers k ≥ m . {\displaystyle k\geq {\sqrt {m}}.}


// so we know we are looking for <= 4 
// idea - map each number to the number of times it could be used in the combination

// Got through the maximally sized tests

export function sumOfSquares_v3(n) { 
    // can be optimized with n^2 - (n-1)^2 = 2n-1
    function initializeSqArray(n){
        let sq_array = []
        const y = Math.floor(Math.sqrt(n));
        for (let i = y; i >= 1; i--){
            sq_array.push(i**2)
        }
        return sq_array
    };

    function getMaxSquarePosition(n) {
        for (let i = 0; i < sq_array.length; i++){
            if (sq_array[i] <= n) {
                return i
            }
        }
    }; 

    function returnSquareCount(n, mx) {
        let count = 0; 
        let x = n
        while ((x > 0) && (count < 4)) {
            x = x - sq_array[mx];
            count += 1;
            mx = getMaxSquarePosition(x);
        }
        return count
    };

    //console.time('initializeArray');
    const sq_array = initializeSqArray(n);
    //console.timeEnd('initializeArray');
    const mx = 0;
    
    let count_arr = [];
    //console.time('iteration');
    for (let j = 0; j < sq_array.length ; j++) {
        let count_j = returnSquareCount(n, j); 
        if ([1, 2].includes(count_j)) { 
            return count_j
        } else {
            count_arr.push(count_j)
            //console.log(count_arr)
        };
    };
    //console.timeEnd('iteration')
    return Math.min(...count_arr)    
};


// we have to be more efficient with the array
