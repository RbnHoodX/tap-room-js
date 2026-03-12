#!/usr/bin/env node
/**
 * Data migration script for converting between different
 * tap room data formats (v1 to v2).
 */

const { TapHouse } = require('../src/taphouse');

function migrateV1ToV2(v1Data) {
  const th = new TapHouse();

  // Create kegs from v1 format
  if (v1Data.kegs && Array.isArray(v1Data.kegs)) {
    for (const kegData of v1Data.kegs) {
      th.createKeg(kegData.name, kegData.capacity);
    }
  }

  // Create tabs from v1 format
  if (v1Data.tabs && Array.isArray(v1Data.tabs)) {
    for (const tabData of v1Data.tabs) {
      if (tabData.parent) {
        th.openSubTab(tabData.parent, tabData.name, tabData.limit);
      } else {
        th.openTab(tabData.name, tabData.limit);
      }
    }
  }

  return th;
}

function validateMigration(source, target) {
  const issues = [];
  if (source.kegs && source.kegs.length !== target.kegs().length) {
    issues.push(`Keg count mismatch: ${source.kegs.length} vs ${target.kegs().length}`);
  }
  if (source.tabs && source.tabs.length !== target.tabs().length) {
    issues.push(`Tab count mismatch: ${source.tabs.length} vs ${target.tabs().length}`);
  }
  return { valid: issues.length === 0, issues };
}

module.exports = { migrateV1ToV2, validateMigration };
