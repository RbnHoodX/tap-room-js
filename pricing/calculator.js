/**
 * Price calculation engine for the tap room.
 * Handles per-ounce pricing, markups, and totals.
 */

function calculatePourCost(amount, ratePerOz) {
  if (typeof amount !== 'number' || typeof ratePerOz !== 'number') {
    return 0;
  }
  return Math.round(amount * ratePerOz * 100) / 100;
}

function calculateTabTotal(dispensations) {
  let total = 0;
  for (const d of dispensations) {
    total += d.amount;
  }
  return total;
}

function applyMarkup(basePrice, markupPct) {
  if (markupPct <= 0) return basePrice;
  return basePrice * (1 + markupPct / 100);
}

function applyTax(subtotal, taxRate) {
  return Math.round(subtotal * (1 + taxRate) * 100) / 100;
}

function splitBill(total, numPeople) {
  if (numPeople <= 0) return [];
  const share = Math.floor(total * 100 / numPeople) / 100;
  const remainder = Math.round((total - share * numPeople) * 100) / 100;
  const shares = new Array(numPeople).fill(share);
  if (remainder > 0) {
    shares[0] = Math.round((shares[0] + remainder) * 100) / 100;
  }
  return shares;
}

function estimateRemaining(keg, avgPourSize) {
  if (avgPourSize <= 0) return 0;
  return Math.floor(keg.remaining / avgPourSize);
}

function calculateTip(subtotal, tipPct) {
  return Math.round(subtotal * tipPct / 100 * 100) / 100;
}

module.exports = {
  calculatePourCost, calculateTabTotal, applyMarkup, applyTax,
  splitBill, estimateRemaining, calculateTip,
};
