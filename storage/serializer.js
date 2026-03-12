/**
 * Serialization utilities for converting tap room objects to/from
 * plain JavaScript objects suitable for JSON storage.
 */

function serializeKeg(keg) {
  return {
    name: keg.name,
    capacity: keg.capacity,
    remaining: keg.remaining,
    dispensationCount: keg.dispensations().length,
  };
}

function serializeTab(tab) {
  return {
    name: tab.name,
    limit: tab.limit,
    balance: tab.balance,
    parent: tab.parent ? tab.parent.name : null,
    childCount: tab.children().length,
    dispensationCount: tab.dispensations().length,
  };
}

function serializeDispensation(d) {
  return {
    id: d.id,
    keg: d.keg.name,
    tab: d.tab.name,
    amount: d.amount,
    memo: d.memo,
  };
}

function serializeTapHouse(th) {
  return {
    kegs: th.kegs().map(serializeKeg),
    tabs: th.tabs().map(serializeTab),
    logEntries: th.logEntries().map(serializeDispensation),
    totalPoured: th.totalPoured(),
  };
}

function toJSON(obj) {
  return JSON.stringify(obj, null, 2);
}

function fromJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
}

module.exports = {
  serializeKeg, serializeTab, serializeDispensation,
  serializeTapHouse, toJSON, fromJSON,
};
