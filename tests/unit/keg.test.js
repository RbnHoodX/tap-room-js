const assert = require('assert');
const { Keg } = require('../../src/keg');

// basic construction
{
  const k = new Keg('IPA', 640);
  assert.strictEqual(k.name, 'IPA');
  assert.strictEqual(k.capacity, 640);
  assert.strictEqual(k.remaining, 640);
  assert.deepStrictEqual(k.dispensations(), []);
}

// remaining tracks dispensations
{
  const k = new Keg('Stout', 100);
  k._addDispensation({ amount: 30 });
  k._addDispensation({ amount: 20 });
  assert.strictEqual(k.remaining, 50);
  assert.strictEqual(k.dispensations().length, 2);
}

// dispensations returns a copy
{
  const k = new Keg('Test', 500);
  k._addDispensation({ amount: 10 });
  const d1 = k.dispensations();
  const d2 = k.dispensations();
  assert.notStrictEqual(d1, d2);
  assert.deepStrictEqual(d1, d2);
}

console.log('keg.test.js: all passed');
