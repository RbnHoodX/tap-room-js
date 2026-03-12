const assert = require('assert');
const { TapHouse } = require('../../src/taphouse');
const { kegUsageSummary, tabActivitySummary } = require('../../reports/summary');
const { pourDistribution, topPourers } = require('../../reports/statistics');
const { formatDistribution, formatBarChart } = require('../../reports/formatter');

// keg usage summary
{
  const th = new TapHouse();
  th.createKeg('A', 100);
  th.createKeg('B', 200);
  th.openTab('T', 500);
  th.pour('A', 'T', 50);
  th.pour('B', 'T', 100);

  const summary = kegUsageSummary(th);
  assert.strictEqual(summary.totalKegs, 2);
  assert.strictEqual(summary.activeKegs, 2);
  assert.strictEqual(summary.emptyKegs, 0);
  assert.strictEqual(summary.totalCapacity, 300);
  assert.strictEqual(summary.totalRemaining, 150);
  assert.strictEqual(summary.utilizationPct, 50);
}

// tab activity summary
{
  const th = new TapHouse();
  th.createKeg('K', 500);
  th.openTab('Parent', 1000);
  th.openSubTab('Parent', 'Child', 200);
  th.pour('K', 'Parent', 30);
  th.pour('K', 'Child', 20);

  const summary = tabActivitySummary(th);
  assert.strictEqual(summary.totalTabs, 2);
  assert.strictEqual(summary.parentTabs, 1);
  assert.strictEqual(summary.subTabs, 1);
  assert.strictEqual(summary.totalBalance, 50);
}

// pour distribution with empty
{
  const dist = pourDistribution([]);
  assert.strictEqual(dist.count, 0);
  assert.strictEqual(dist.mean, 0);
}

// pour distribution with data
{
  const entries = [{ amount: 10 }, { amount: 20 }, { amount: 30 }];
  const dist = pourDistribution(entries);
  assert.strictEqual(dist.count, 3);
  assert.strictEqual(dist.min, 10);
  assert.strictEqual(dist.max, 30);
  assert.strictEqual(dist.mean, 20);
  assert.strictEqual(dist.median, 20);
}

// top pourers
{
  const th = new TapHouse();
  th.createKeg('K', 1000);
  th.openTab('Alice', 500);
  th.openTab('Bob', 500);
  th.pour('K', 'Alice', 50);
  th.pour('K', 'Alice', 30);
  th.pour('K', 'Bob', 20);

  const top = topPourers(th, 2);
  assert.strictEqual(top[0].name, 'Alice');
  assert.strictEqual(top[0].totalPoured, 80);
}

// format distribution
{
  const dist = { count: 5, min: 10, max: 50, mean: 30, median: 28 };
  const s = formatDistribution(dist);
  assert(s.includes('Count: 5'));
  assert(s.includes('Min: 10'));
}

// format bar chart
{
  const data = [
    { label: 'IPA', value: 100 },
    { label: 'Stout', value: 50 },
  ];
  const chart = formatBarChart(data, 20);
  assert(chart.includes('IPA'));
  assert(chart.includes('Stout'));
}

console.log('reports.test.js: all passed');
