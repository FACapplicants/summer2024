import { assert, config } from "chai";
import { tribonacci } from "../6_tribonacci_sequence.mjs";
// new import from chai - config


//const {assert, config} = require('chai');
config.truncateThreshold = 0; // apparently this sets the length 
// threshold for actual and expected values in assertion errors
// 0 actually removes truncating/ removes the default value of 40

describe("Basic tests", () => {
  it("Base tests", () => {
      assert.deepEqual(tribonacci([1,1,1], 10), [1,1,1,3,5,9,17,31,57,105]   );
      assert.deepEqual(tribonacci([0,0,1], 10), [0,0,1,1,2,4,7,13,24,44]     );
      assert.deepEqual(tribonacci([0,1,1], 10), [0,1,1,2,4,7,13,24,44,81]    );
      assert.deepEqual(tribonacci([1,0,0], 10), [1,0,0,1,1,2,4,7,13,24]      );
      assert.deepEqual(tribonacci([0,0,0], 10), [0,0,0,0,0,0,0,0,0,0]        );
      assert.deepEqual(tribonacci([1,2,3], 10), [1,2,3,6,11,20,37,68,125,230]);
      assert.deepEqual(tribonacci([3,2,1], 10), [3,2,1,6,9,16,31,56,103,190] );
      assert.deepEqual(tribonacci([1,1,1],  1), [1]);
      assert.deepEqual(tribonacci([300,200,100], 0), []);
    });
});
