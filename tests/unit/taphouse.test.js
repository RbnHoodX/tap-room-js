const assert = require('assert');
const { TapHouse } = require('../../src/taphouse');

// basic construction
{
  const th = new TapHouse();
  assert.deepStrictEqual(th.kegs(), []);
  assert.deepStrictEqual(th.tabs(), []);
  assert.deepStrictEqual(th.logEntries(), []);
  assert.strictEqual(th.totalPoured(), 0);
}

// create and get keg
{
  const th = new TapHouse();
  const k = th.createKeg('IPA', 640);
  assert.strictEqual(k.name, 'IPA');
  assert.strictEqual(th.getKeg('IPA'), k);
  assert.strictEqual(th.kegs().length, 1);
}

// duplicate keg throws
{
  const th = new TapHouse();
  th.createKeg('A', 100);
  assert.throws(() => th.createKeg('A', 200));
}

// open and get tab
{
  const th = new TapHouse();
  const t = th.openTab('Alice', 200);
  assert.strictEqual(t.name, 'Alice');
  assert.strictEqual(th.getTab('Alice'), t);
}

// open sub-tab
{
  const th = new TapHouse();
  th.openTab('Table', 500);
  const child = th.openSubTab('Table', 'Guest', 150);
  assert.strictEqual(child.parent.name, 'Table');
  assert.strictEqual(th.getTab('Table').children().length, 1);
}

// basic pour
{
  const th = new TapHouse();
  th.createKeg('K', 500);
  th.openTab('T', 500);
  const d = th.pour('K', 'T', 50);
  assert.strictEqual(d.amount, 50);
  assert.strictEqual(th.getKeg('K').remaining, 450);
  assert.strictEqual(th.totalPoured(), 50);
  assert.strictEqual(th.logEntries().length, 1);
}

// pour with memo
{
  const th = new TapHouse();
  th.createKeg('K', 500);
  th.openTab('T', 500);
  const d = th.pour('K', 'T', 30, 'tasting');
  assert.strictEqual(d.memo, 'tasting');
}

// pour rejects non-positive amount
{
  const th = new TapHouse();
  th.createKeg('K', 500);
  th.openTab('T', 500);
  assert.throws(() => th.pour('K', 'T', 0));
  assert.throws(() => th.pour('K', 'T', -5));
}

// get nonexistent keg throws
{
  const th = new TapHouse();
  assert.throws(() => th.getKeg('ghost'));
}

// get nonexistent tab throws
{
  const th = new TapHouse();
  assert.throws(() => th.getTab('ghost'));
}

console.log('taphouse.test.js: all passed');
