const assert = require('assert');
const { Tab } = require('../../src/tab');

// basic construction
{
  const t = new Tab('Alice', 200);
  assert.strictEqual(t.name, 'Alice');
  assert.strictEqual(t.limit, 200);
  assert.strictEqual(t.balance, 0);
  assert.strictEqual(t.parent, null);
  assert.deepStrictEqual(t.children(), []);
}

// balance sums dispensation amounts
{
  const t = new Tab('Bob', 500);
  t._addDispensation({ amount: 30 });
  t._addDispensation({ amount: 50 });
  assert.strictEqual(t.balance, 80);
}

// parent-child relationship
{
  const parent = new Tab('Table', 1000);
  const child = new Tab('Guest', 200);
  parent._addChild(child);
  assert.strictEqual(child.parent, parent);
  assert.strictEqual(parent.children().length, 1);
  assert.strictEqual(parent.children()[0], child);
}

// children returns a copy
{
  const p = new Tab('P', 500);
  const c = new Tab('C', 100);
  p._addChild(c);
  const ch1 = p.children();
  ch1.push(new Tab('Fake', 50));
  assert.strictEqual(p.children().length, 1);
}

console.log('tab.test.js: all passed');
