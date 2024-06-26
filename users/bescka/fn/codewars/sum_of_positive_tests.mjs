// These are the actual basic tests given by Codewars. Let's try and run them
// locally!
// (note do do this you need to have nodejs installed on your machine) 
// To run you first navigate to this directory and use "npm install" to get 
// chai/mocha and their dependencies which have been defined in the 
// package-lock.json file (mocha is the testing module, chai provides 
// assertion functionality) to run it's "npx mocha sum_of_positive_test.mjs"

import { assert } from "chai";
import positiveSum from "./sum_of_positive.mjs";


describe("Basic tests", () => { // mocha function for grouping tests
  it("Testing for fixed tests", () => { // "it" defines an individual test case
    assert.strictEqual(positiveSum([1,2,3,4,5]),15);
    assert.strictEqual(positiveSum([1,-2,3,4,5]),13);
    assert.strictEqual(positiveSum([]),0);
    assert.strictEqual(positiveSum([-1,-2,-3,-4,-5]),0);
    assert.strictEqual(positiveSum([-1,2,3,4,-5]),9);
    });
  });

//   mocha.run(); // this is used for running in browser not from calling from terminal