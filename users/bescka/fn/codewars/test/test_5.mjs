import { assert } from "chai"; 
import { pigIt } from "../5_simple_pig_latin.mjs";
import { alphanumeric } from "../5_not_very_secure.mjs";
import { cakes } from "../5_pete_the_baker.mjs";

describe("pigIt Tests", () => {
  it("convert words to pig latin", () => {
    assert.deepEqual(pigIt('Pig latin is cool'),'igPay atinlay siay oolcay')
    assert.deepEqual(pigIt('This is my string'),'hisTay siay ymay tringsay')
    });
});


describe("alphanumeric Tests", () => {
  it("validate alphanumeric strings", () => {
    assert.strictEqual(alphanumeric("Mazinkaiser"), true)
    assert.strictEqual(alphanumeric("hello world_"), false)
    assert.strictEqual(alphanumeric("PassW0rd"), true)
    assert.strictEqual(alphanumeric("     "), false)
  });
});


describe('description example', function() {
  it('pass example tests', function() {
    let recipe = {flour: 500, sugar: 200, eggs: 1};
    let available = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};
    assert.equal(cakes(recipe, available), 2);
    
    recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
    available = {sugar: 500, flour: 2000, milk: 2000};
    assert.equal(cakes(recipe, available), 0);
  });
});

