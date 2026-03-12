const assert = require('assert');
const { serializeKeg, serializeTab, serializeDispensation, toJSON, fromJSON } = require('../../storage/serializer');
const { formatPrice, centsToDecimal, decimalToCents } = require('../../pricing/currency');

// serializer
{
  const keg = {
    name: 'IPA', capacity: 640, remaining: 500,
    dispensations() { return [1, 2]; },
  };
  const s = serializeKeg(keg);
  assert.strictEqual(s.name, 'IPA');
  assert.strictEqual(s.dispensationCount, 2);
}

{
  const tab = {
    name: 'Alice', limit: 200, balance: 50,
    parent: { name: 'Table' },
    children() { return [1]; },
    dispensations() { return [1, 2, 3]; },
  };
  const s = serializeTab(tab);
  assert.strictEqual(s.parent, 'Table');
  assert.strictEqual(s.childCount, 1);
}

// JSON roundtrip
{
  const obj = { name: 'test', value: 42 };
  const json = toJSON(obj);
  const parsed = fromJSON(json);
  assert.deepStrictEqual(parsed, obj);
}

{
  assert.throws(() => fromJSON('not json'));
}

// currency
assert.strictEqual(formatPrice(10.5), '$10.50');
assert.strictEqual(formatPrice(-3.2), '-$3.20');
assert.strictEqual(centsToDecimal(1050), 10.5);
assert.strictEqual(decimalToCents(10.5), 1050);

console.log('storage.test.js: all passed');
