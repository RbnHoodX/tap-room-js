/**
 * Display formatting utilities for the tap room system.
 * Handles human-readable output of kegs, tabs, and pours.
 */

function formatVolume(amount, unit = 'oz') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 ' + unit;
  }
  if (amount >= 128 && unit === 'oz') {
    const gallons = (amount / 128).toFixed(2);
    return gallons + ' gal';
  }
  return amount.toFixed(1) + ' ' + unit;
}

function formatCurrency(cents) {
  if (typeof cents !== 'number' || isNaN(cents)) {
    return '$0.00';
  }
  const dollars = Math.abs(cents / 100);
  const sign = cents < 0 ? '-' : '';
  return sign + '$' + dollars.toFixed(2);
}

function formatKegStatus(keg) {
  const pct = ((keg.remaining / keg.capacity) * 100).toFixed(0);
  return `${keg.name}: ${formatVolume(keg.remaining)} remaining (${pct}%)`;
}

function formatTabStatus(tab) {
  const used = ((tab.balance / tab.limit) * 100).toFixed(0);
  return `${tab.name}: ${formatCurrency(tab.balance * 100)} of ${formatCurrency(tab.limit * 100)} (${used}% used)`;
}

function formatDispensation(d) {
  const parts = [`#${d.id}`, formatVolume(d.amount)];
  if (d.memo) parts.push(`"${d.memo}"`);
  return parts.join(' — ');
}

function padRight(str, len) {
  while (str.length < len) str += ' ';
  return str;
}

function padLeft(str, len) {
  while (str.length < len) str = ' ' + str;
  return str;
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

function tableRow(columns, widths) {
  return columns.map((col, i) => {
    const s = String(col);
    return i === columns.length - 1 ? s : padRight(s, widths[i] || 10);
  }).join(' | ');
}

function horizontalRule(width) {
  return '-'.repeat(width);
}

module.exports = {
  formatVolume, formatCurrency, formatKegStatus, formatTabStatus,
  formatDispensation, padRight, padLeft, truncate, tableRow, horizontalRule,
};
