/**
 * Currency formatting and conversion utilities.
 */

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

function formatPrice(amount, currency = 'USD') {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toFixed(2);
  return (amount < 0 ? '-' : '') + symbol + formatted;
}

function centsToDecimal(cents) {
  return Math.round(cents) / 100;
}

function decimalToCents(decimal) {
  return Math.round(decimal * 100);
}

function roundToNearest(amount, nearest) {
  if (nearest <= 0) return amount;
  return Math.round(amount / nearest) * nearest;
}

function addAmounts(...amounts) {
  const totalCents = amounts.reduce((sum, a) => {
    return sum + Math.round(a * 100);
  }, 0);
  return totalCents / 100;
}

function subtractAmount(from, amount) {
  return (Math.round(from * 100) - Math.round(amount * 100)) / 100;
}

function percentOf(amount, pct) {
  return Math.round(amount * pct) / 100;
}

module.exports = {
  CURRENCY_SYMBOLS, formatPrice, centsToDecimal, decimalToCents,
  roundToNearest, addAmounts, subtractAmount, percentOf,
};
