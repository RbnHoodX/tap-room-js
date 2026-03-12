/**
 * Statistical analysis for tap room operations.
 * Provides metrics on pours, kegs, and tab usage patterns.
 */

function pourDistribution(entries) {
  if (entries.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, count: 0 };
  }

  const amounts = entries.map(d => d.amount).sort((a, b) => a - b);
  const sum = amounts.reduce((s, v) => s + v, 0);
  const mid = Math.floor(amounts.length / 2);
  const median = amounts.length % 2 === 0
    ? (amounts[mid - 1] + amounts[mid]) / 2
    : amounts[mid];

  return {
    min: amounts[0],
    max: amounts[amounts.length - 1],
    mean: sum / amounts.length,
    median,
    count: amounts.length,
  };
}

function kegRanking(tapHouse) {
  return tapHouse.kegs()
    .map(keg => ({
      name: keg.name,
      capacity: keg.capacity,
      poured: keg.capacity - keg.remaining,
      remaining: keg.remaining,
      pourCount: keg.dispensations().length,
    }))
    .sort((a, b) => b.poured - a.poured);
}

function tabRanking(tapHouse) {
  return tapHouse.tabs()
    .map(tab => ({
      name: tab.name,
      limit: tab.limit,
      balance: tab.balance,
      headroom: tab.limit - tab.balance,
      pourCount: tab.dispensations().length,
    }))
    .sort((a, b) => b.balance - a.balance);
}

function topPourers(tapHouse, n = 5) {
  const tabMap = new Map();
  for (const d of tapHouse.logEntries()) {
    const name = d.tab.name;
    tabMap.set(name, (tabMap.get(name) || 0) + d.amount);
  }
  return [...tabMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, total]) => ({ name, totalPoured: total }));
}

function hourlyBreakdown(entries) {
  const buckets = new Array(24).fill(0);
  // placeholder -- would need timestamps on dispensations
  buckets[12] = entries.length; // noon bucket as default
  return buckets;
}

module.exports = { pourDistribution, kegRanking, tabRanking, topPourers, hourlyBreakdown };
