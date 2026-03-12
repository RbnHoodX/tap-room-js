/**
 * Export utilities for generating text, CSV, and JSON output
 * from tap room data structures.
 */

const { serializeKeg, serializeTab, serializeDispensation } = require('./serializer');

function exportToText(tapHouse) {
  const lines = [];
  lines.push('=== TAP HOUSE REPORT ===');
  lines.push('');

  lines.push('KEGS:');
  for (const keg of tapHouse.kegs()) {
    const pct = ((keg.remaining / keg.capacity) * 100).toFixed(1);
    lines.push(`  ${keg.name}: ${keg.remaining}/${keg.capacity} oz (${pct}% full)`);
  }
  lines.push('');

  lines.push('TABS:');
  for (const tab of tapHouse.tabs()) {
    const parentInfo = tab.parent ? ` (sub-tab of ${tab.parent.name})` : '';
    lines.push(`  ${tab.name}: ${tab.balance}/${tab.limit}${parentInfo}`);
  }
  lines.push('');

  lines.push('LOG:');
  for (const d of tapHouse.logEntries()) {
    lines.push(`  #${d.id}: ${d.amount} oz from ${d.keg.name} to ${d.tab.name}`);
  }
  lines.push('');
  lines.push(`Total poured: ${tapHouse.totalPoured()} oz`);

  return lines.join('\n');
}

function exportToCSV(items, fields) {
  const header = fields.join(',');
  const rows = items.map(item => {
    return fields.map(f => {
      const val = typeof item[f] === 'string' ? `"${item[f]}"` : item[f];
      return val !== undefined ? val : '';
    }).join(',');
  });
  return [header, ...rows].join('\n');
}

function exportKegsCSV(tapHouse) {
  const data = tapHouse.kegs().map(serializeKeg);
  return exportToCSV(data, ['name', 'capacity', 'remaining', 'dispensationCount']);
}

function exportTabsCSV(tapHouse) {
  const data = tapHouse.tabs().map(serializeTab);
  return exportToCSV(data, ['name', 'limit', 'balance', 'parent', 'childCount']);
}

function exportLogCSV(tapHouse) {
  const data = tapHouse.logEntries().map(serializeDispensation);
  return exportToCSV(data, ['id', 'keg', 'tab', 'amount', 'memo']);
}

module.exports = { exportToText, exportToCSV, exportKegsCSV, exportTabsCSV, exportLogCSV };
