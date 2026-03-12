/**
 * Report formatting utilities for producing human-readable
 * reports from statistical data.
 */

function formatSummaryReport(summary) {
  const lines = [];
  lines.push('╔══════════════════════════════════╗');
  lines.push('║     TAP HOUSE DAILY SUMMARY      ║');
  lines.push('╚══════════════════════════════════╝');
  lines.push('');

  const k = summary.kegs;
  lines.push(`Kegs: ${k.totalKegs} total (${k.activeKegs} active, ${k.emptyKegs} empty)`);
  lines.push(`  Capacity: ${k.totalRemaining}/${k.totalCapacity} oz remaining`);
  lines.push(`  Utilization: ${k.utilizationPct.toFixed(1)}%`);
  lines.push('');

  const t = summary.tabs;
  lines.push(`Tabs: ${t.totalTabs} total (${t.parentTabs} parent, ${t.subTabs} sub-tabs)`);
  lines.push(`  Total balance: ${t.totalBalance} / ${t.totalLimit} limit`);
  lines.push(`  Average balance: ${t.avgBalance.toFixed(2)}`);
  lines.push('');

  lines.push(`Pours: ${summary.totalPours}`);
  lines.push(`Volume: ${summary.totalVolume} oz`);

  return lines.join('\n');
}

function formatRanking(items, label) {
  const lines = [`--- ${label} ---`];
  items.forEach((item, i) => {
    lines.push(`  ${i + 1}. ${item.name}: ${item.poured || item.balance || 0}`);
  });
  return lines.join('\n');
}

function formatDistribution(dist) {
  return [
    `Count: ${dist.count}`,
    `Min: ${dist.min}`,
    `Max: ${dist.max}`,
    `Mean: ${dist.mean.toFixed(2)}`,
    `Median: ${dist.median}`,
  ].join(' | ');
}

function formatBarChart(data, maxWidth = 40) {
  if (data.length === 0) return '';
  const maxVal = Math.max(...data.map(d => d.value));
  return data.map(d => {
    const barLen = maxVal > 0 ? Math.round((d.value / maxVal) * maxWidth) : 0;
    const bar = '█'.repeat(barLen);
    return `${d.label.padEnd(15)} ${bar} ${d.value}`;
  }).join('\n');
}

module.exports = { formatSummaryReport, formatRanking, formatDistribution, formatBarChart };
