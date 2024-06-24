import { assert } from "chai";
import { divisors, divisorsUpvoted } from "../7_find_the_divisors.mjs";


describe("find_the_divisors", () => { //mocha function for grouping tests
    it("Codewars_Tests", () => {  // 'it' = individual test case
        assert.deepEqual(divisors(15), [3, 5]);
        assert.deepEqual(divisors(12), [2, 3, 4, 6]);
        assert.deepEqual(divisors(13), "13 is prime");
    });
    it("Codewars_Tests", () => {  // 'it' = individual test case
        assert.deepEqual(divisorsUpvoted(15), [3, 5]);
        assert.deepEqual(divisorsUpvoted(12), [2, 3, 4, 6]);
        assert.deepEqual(divisorsUpvoted(13), "13 is prime");
    });
});

