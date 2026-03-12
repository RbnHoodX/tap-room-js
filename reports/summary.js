/**
 * Summary report generation for the tap room.
 * Creates high-level overviews of keg usage and tab activity.
 */

function kegUsageSummary(tapHouse) {
  const kegs = tapHouse.kegs();
  const summary = {
    totalKegs: kegs.length,
    activeKegs: 0,
    emptyKegs: 0,
    totalCapacity: 0,
    totalRemaining: 0,
    utilizationPct: 0,
  };

  for (const keg of kegs) {
    summary.totalCapacity += keg.capacity;
    summary.totalRemaining += keg.remaining;
    if (keg.remaining > 0) {
      summary.activeKegs++;
    } else {
      summary.emptyKegs++;
    }
  }

  if (summary.totalCapacity > 0) {
    const used = summary.totalCapacity - summary.totalRemaining;
    summary.utilizationPct = (used / summary.totalCapacity) * 100;
  }

  return summary;
}

function tabActivitySummary(tapHouse) {
  const tabs = tapHouse.tabs();
  const summary = {
    totalTabs: tabs.length,
    parentTabs: 0,
    subTabs: 0,
    totalLimit: 0,
    totalBalance: 0,
    avgBalance: 0,
  };

  for (const tab of tabs) {
    summary.totalLimit += tab.limit;
    summary.totalBalance += tab.balance;
    if (tab.parent) {
      summary.subTabs++;
    } else {
      summary.parentTabs++;
    }
  }

  if (summary.totalTabs > 0) {
    summary.avgBalance = summary.totalBalance / summary.totalTabs;
  }

  return summary;
}

function dailySummary(tapHouse) {
  return {
    kegs: kegUsageSummary(tapHouse),
    tabs: tabActivitySummary(tapHouse),
    totalPours: tapHouse.logEntries().length,
    totalVolume: tapHouse.totalPoured(),
  };
}

module.exports = { kegUsageSummary, tabActivitySummary, dailySummary };
