// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?
//
// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.


export function cakes_v1(recipe, available){
    let min_val = Infinity; 
    for (let key in recipe) {
        if (available[key] != undefined) {
            min_val = Math.min(Math.floor(available[key]/recipe[key]), min_val)
        } else {
            return 0;
        }
    }
    return min_val;
}


// Top answer review
export function cakes_top(recipe, available) {
    return Object.keys(recipe).reduce(function(val, ingredient) {
        return Math.min(Math.floor((available[ingredient] || 0) / recipe[ingredient]), val);
    }, Infinity);
}
// actually pretty similar in logic - initializes val as inifinity in the 
// second value of the accumulator 
// || 0 handles available[ingredient] when undefined
// Object.keys(recipe) returns an array of the keys
// array.reduce(function(accumulator, currentValue) is the general syntax - so ingredient is the current key in the array being iterated on.
