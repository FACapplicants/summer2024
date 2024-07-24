import { assert } from "chai"; 
import { sumOfSquares } from "../4_sums_of_perfect_squares.mjs";

describe("Solution", () => {
  it("Base tests", () => {
    assert.deepEqual(sumOfSquares(15), 4)
    assert.deepEqual(sumOfSquares(16), 1)
    assert.deepEqual(sumOfSquares(17), 2)
    assert.deepEqual(sumOfSquares(18), 2)
    assert.deepEqual(sumOfSquares(19), 3)
  });
});

describe("Solution", () => {
    it("Maximal Tests", function(done) {
        this.timeout(12000); // Mocha defaults to 2 seconds, this is how we change it. 
        const n = 661915703;
        const result = sumOfSquares(n);
        console.log(`result for n = ${n}`, result);
        done();
    });
  });


      //   assert.deepEqual(sumOfSquares(661915703), )
    //   assert.deepEqual(sumOfSquares(999887641), 1)
    //   assert.deepEqual(sumOfSquares(999950886), 2)
    //   assert.deepEqual(sumOfSquares(999951173), 2)
    //   assert.deepEqual(sumOfSquares(999998999), 3)