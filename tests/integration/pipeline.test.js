const assert = require('assert');
const { TapHouse } = require('../../src/taphouse');
const { serializeTapHouse, toJSON, fromJSON } = require('../../storage/serializer');
const { calculatePourCost, splitBill } = require('../../pricing/calculator');
const { volumeDiscount, loyaltyDiscount } = require('../../pricing/discounts');
const { formatPrice } = require('../../pricing/currency');

// pipeline: pour -> serialize -> analyze
{
  const th = new TapHouse();
  th.createKeg('Pale Ale', 640);
  th.openTab('Guest', 300);

  for (let i = 0; i < 6; i++) {
    th.pour('Pale Ale', 'Guest', 16, `round ${i + 1}`);
  }

  // serialize
  const data = serializeTapHouse(th);
  assert.strictEqual(data.kegs.length, 1);
  assert.strictEqual(data.logEntries.length, 6);
  assert.strictEqual(data.totalPoured, 96);

  // JSON roundtrip
  const json = toJSON(data);
  const restored = fromJSON(json);
  assert.strictEqual(restored.totalPoured, 96);

  // pricing
  const cost = calculatePourCost(16, 0.5);
  assert.strictEqual(cost, 8);

  const discount = volumeDiscount(6);
  assert.strictEqual(discount, 0.10);

  const loyalty = loyaltyDiscount(96);
  assert.strictEqual(loyalty, 0.05);

  // bill split
  const shares = splitBill(48, 3);
  assert.strictEqual(shares.length, 3);
  const total = shares.reduce((s, v) => s + v, 0);
  assert(Math.abs(total - 48) < 0.01);

  // format
  const formatted = formatPrice(cost);
  assert.strictEqual(formatted, '$8.00');
}

console.log('pipeline.test.js: all passed');
