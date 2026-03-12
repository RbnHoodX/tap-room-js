const assert = require('assert');
const { calculatePourCost, applyMarkup, applyTax, splitBill, calculateTip } = require('../../pricing/calculator');
const { volumeDiscount, loyaltyDiscount, happyHourRate, flightDiscount } = require('../../pricing/discounts');
const { addAmounts, subtractAmount, percentOf, roundToNearest } = require('../../pricing/currency');

// calculator
assert.strictEqual(calculatePourCost(16, 0.5), 8);
assert.strictEqual(calculatePourCost(0, 5), 0);
assert.strictEqual(calculatePourCost('bad', 1), 0);
assert.strictEqual(applyMarkup(10, 20), 12);
assert.strictEqual(applyMarkup(10, 0), 10);
assert.strictEqual(applyTax(10, 0.08), 10.80);

// split bill
{
  const shares = splitBill(30, 4);
  assert.strictEqual(shares.length, 4);
  const total = shares.reduce((s, v) => s + v, 0);
  assert(Math.abs(total - 30) < 0.02);
}
assert.deepStrictEqual(splitBill(100, 0), []);

// tip
assert.strictEqual(calculateTip(50, 20), 10);
assert.strictEqual(calculateTip(100, 15), 15);

// discounts
assert.strictEqual(volumeDiscount(1), 0);
assert.strictEqual(volumeDiscount(3), 0.05);
assert.strictEqual(volumeDiscount(5), 0.10);
assert.strictEqual(volumeDiscount(15), 0.15);
assert.strictEqual(loyaltyDiscount(10), 0);
assert.strictEqual(loyaltyDiscount(50), 0.05);
assert.strictEqual(loyaltyDiscount(500), 0.20);
assert.strictEqual(happyHourRate(10, false), 10);
assert.strictEqual(happyHourRate(10, true), 5);
assert.strictEqual(flightDiscount(2), 0);
assert.strictEqual(flightDiscount(4), 0.15);
assert.strictEqual(flightDiscount(6), 0.25);

// currency math
assert.strictEqual(addAmounts(1.1, 2.2), 3.3);
assert.strictEqual(subtractAmount(10, 3.3), 6.7);
assert.strictEqual(percentOf(200, 15), 30);
assert.strictEqual(roundToNearest(17.3, 5), 15);
assert.strictEqual(roundToNearest(18, 5), 20);

console.log('pricing.test.js: all passed');
