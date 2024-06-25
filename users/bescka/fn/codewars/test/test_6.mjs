import { assert, config } from "chai";
import {tribonacci , tribonacci_v2 } from "../6_tribonacci_sequence.mjs";
// new import from chai - config


//const {assert, config} = require('chai');
config.truncateThreshold = 0; // apparently this sets the length 
// threshold for actual and expected values in assertion errors
// 0 actually removes truncating/ removes the default value of 40

describe("Basic tests",function(){
  const functions = [tribonacci, tribonacci_v2]; // if multiple versions
  
  function doTest(input, expected) {
    let [sig, len] = input;
    it(`Testing signature=[${sig}], n=${len}`, () => {
      assert.deepEqual(tribonacci(sig, len), expected);
    });
  }
  
  functions.forEach(({function}) => {
    describe("Testing function `${function}", function() {
      doTest([ [1,1,1], 10], [1,1,1,3,5,9,17,31,57,105]   );
      doTest([ [0,0,1], 10], [0,0,1,1,2,4,7,13,24,44]     );
      doTest([ [0,1,1], 10], [0,1,1,2,4,7,13,24,44,81]    );
      doTest([ [1,0,0], 10], [1,0,0,1,1,2,4,7,13,24]      );
      doTest([ [0,0,0], 10], [0,0,0,0,0,0,0,0,0,0]        );
      doTest([ [1,2,3], 10], [1,2,3,6,11,20,37,68,125,230]);
      doTest([ [3,2,1], 10], [3,2,1,6,9,16,31,56,103,190] );
      doTest([ [1,1,1],  1], [1]);
      doTest([[300,200,100], 0], []);
  });
});
