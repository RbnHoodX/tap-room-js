/**
 * Discount rules for the tap room system.
 * Supports volume-based, loyalty, and happy hour discounts.
 */

function volumeDiscount(pourCount) {
  if (pourCount >= 10) return 0.15;
  if (pourCount >= 5) return 0.10;
  if (pourCount >= 3) return 0.05;
  return 0;
}

function loyaltyDiscount(totalSpent) {
  if (totalSpent >= 500) return 0.20;
  if (totalSpent >= 200) return 0.15;
  if (totalSpent >= 100) return 0.10;
  if (totalSpent >= 50) return 0.05;
  return 0;
}

function happyHourRate(baseRate, isHappyHour) {
  if (!isHappyHour) return baseRate;
  return baseRate * 0.5;
}

function bundlePrice(items, bundleDiscount) {
  if (items.length < 2) return items.reduce((s, i) => s + i.price, 0);
  const total = items.reduce((s, i) => s + i.price, 0);
  return total * (1 - bundleDiscount);
}

function applyBestDiscount(price, discounts) {
  if (discounts.length === 0) return price;
  const bestDiscount = Math.max(...discounts);
  return price * (1 - bestDiscount);
}

function flightDiscount(flightSize) {
  if (flightSize >= 6) return 0.25;
  if (flightSize >= 4) return 0.15;
  return 0;
}

function firstTimeDiscount(isFirstVisit) {
  return isFirstVisit ? 0.10 : 0;
}

module.exports = {
  volumeDiscount, loyaltyDiscount, happyHourRate, bundlePrice,
  applyBestDiscount, flightDiscount, firstTimeDiscount,
};
