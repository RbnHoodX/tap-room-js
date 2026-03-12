const assert = require('assert');
const { Dispensation, BarLog } = require('../../src/dispensation');

// basic construction
{
  const keg = { name: 'K', _addDispensation() {} };
  const tab = { name: 'T', _addDispensation() {} };
  const d = new Dispensation(keg, tab, 50, 'test');
  assert.strictEqual(d.keg, keg);
  assert.strictEqual(d.tab, tab);
  assert.strictEqual(d.amount, 50);
  assert.strictEqual(d.memo, 'test');
  assert.strictEqual(d.id, 0);
}

// memo defaults to empty
{
  const keg = { _addDispensation() {} };
  const tab = { _addDispensation() {} };
  const d = new Dispensation(keg, tab, 25);
  assert.strictEqual(d.memo, '');
}

// barlog record assigns id and wires
{
  const keg = { dispensations: [], _addDispensation(d) { this.dispensations.push(d); } };
  const tab = { dispensations: [], _addDispensation(d) { this.dispensations.push(d); } };
  const log = new BarLog();

  const d1 = new Dispensation(keg, tab, 10);
  log.record(d1);
  assert.strictEqual(d1.id, 1);
  assert.strictEqual(keg.dispensations.length, 1);
  assert.strictEqual(tab.dispensations.length, 1);

  const d2 = new Dispensation(keg, tab, 20);
  log.record(d2);
  assert.strictEqual(d2.id, 2);
  assert.strictEqual(log.entries().length, 2);
}

// entries returns a copy
{
  const log = new BarLog();
  const e1 = log.entries();
  const e2 = log.entries();
  assert.notStrictEqual(e1, e2);
}

console.log('dispensation.test.js: all passed');
