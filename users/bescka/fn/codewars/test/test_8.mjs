// These are the actual basic tests given by Codewars. Let's try and run them
// locally!
// (note do do this you need to have nodejs installed on your machine) 
// To run you first navigate to this directory and use "npm install" to get 
// chai/mocha and their dependencies which have been defined in the 
// package-lock.json file (mocha is the testing module, chai provides 
// assertion functionality) to run it's "npx mocha 7_find_the_divisors_test.mjs"

// in package.json we can also set 
// "scripts": {
//     "test": "mocha"
//   },
// in order to be able to run "npm test"

// or 
// "scripts": {
//     "test": "mocha",
//     "test:divisors": "mocha test/test.mjs --grep 'sum_of_positive'",
//   },
// Then you can run "npm run test:divisors"

// GREP: 
// quite nice is
// npx mocha --grep 'test description' to run specific tests



import { assert } from "chai";
import positiveSum from "../8_sum_of_positive.mjs";


describe("sum_of_positive", () => { // mocha function for grouping tests
    it("Testing for fixed tests", () => { // "it" defines an individual test case
      assert.strictEqual(positiveSum([1,2,3,4,5]),15);
      assert.strictEqual(positiveSum([1,-2,3,4,5]),13);
      assert.strictEqual(positiveSum([]),0);
      assert.strictEqual(positiveSum([-1,-2,-3,-4,-5]),0);
      assert.strictEqual(positiveSum([-1,2,3,4,-5]),9);
      });
    });

