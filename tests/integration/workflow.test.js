const assert = require('assert');
const { TapHouse } = require('../../src/taphouse');
const { dailySummary } = require('../../reports/summary');
const { kegRanking, pourDistribution } = require('../../reports/statistics');
const { exportToText } = require('../../storage/exporter');

// full workflow: create, pour, report
{
  const th = new TapHouse();
  th.createKeg('IPA', 640);
  th.createKeg('Stout', 640);
  th.openTab('Table 1', 500);
  th.openSubTab('Table 1', 'Alice', 200);
  th.openSubTab('Table 1', 'Bob', 200);

  th.pour('IPA', 'Alice', 16);
  th.pour('Stout', 'Bob', 12);
  th.pour('IPA', 'Table 1', 16);

  const summary = dailySummary(th);
  assert.strictEqual(summary.totalPours, 3);
  assert.strictEqual(summary.totalVolume, 44);
  assert.strictEqual(summary.kegs.totalKegs, 2);
  assert.strictEqual(summary.tabs.totalTabs, 3);
  assert.strictEqual(summary.tabs.subTabs, 2);

  const ranking = kegRanking(th);
  assert.strictEqual(ranking[0].name, 'IPA'); // poured 32 vs 12
  assert.strictEqual(ranking[0].poured, 32);

  const dist = pourDistribution(th.logEntries());
  assert.strictEqual(dist.count, 3);
  assert.strictEqual(dist.min, 12);
  assert.strictEqual(dist.max, 16);

  const text = exportToText(th);
  assert(text.includes('IPA'));
  assert(text.includes('Alice'));
  assert(text.includes('Total poured: 44'));
}

console.log('workflow.test.js: all passed');
