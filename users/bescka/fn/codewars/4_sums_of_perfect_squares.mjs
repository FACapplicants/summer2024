// v1 idea: 
    // square root the original number, then take the 
    // integer (without the remainder), square it, then take it away 
    // from the original number. 
    // then repeat with the remainder from n - (integer**2)
export function sumOfSquares_init(n) {
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
export function sumOfSquares(n) { 

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
