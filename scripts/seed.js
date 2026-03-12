#!/usr/bin/env node
/**
 * Seed script to populate a tap house with sample data
 * for testing and demonstration purposes.
 */

const { TapHouse } = require('../src/taphouse');

function seedTapHouse() {
  const th = new TapHouse();

  // Create some kegs
  th.createKeg('Hazy IPA', 640);
  th.createKeg('Pilsner', 992);
  th.createKeg('Stout', 640);
  th.createKeg('Amber Ale', 640);
  th.createKeg('Wheat Beer', 992);

  // Open some tabs with sub-tabs
  th.openTab('Table 1', 500);
  th.openSubTab('Table 1', 'Alice', 200);
  th.openSubTab('Table 1', 'Bob', 200);

  th.openTab('Table 2', 800);
  th.openSubTab('Table 2', 'Charlie', 300);
  th.openSubTab('Table 2', 'Diana', 300);
  th.openSubTab('Table 2', 'Eve', 200);

  th.openTab('Bar Seat 1', 150);
  th.openTab('Bar Seat 2', 150);

  // Pour some drinks
  th.pour('Hazy IPA', 'Alice', 16, 'first round');
  th.pour('Pilsner', 'Bob', 16, 'first round');
  th.pour('Stout', 'Charlie', 12, 'taster');
  th.pour('Amber Ale', 'Diana', 16);
  th.pour('Wheat Beer', 'Eve', 16);
  th.pour('Hazy IPA', 'Bar Seat 1', 16);
  th.pour('Pilsner', 'Bar Seat 2', 20, 'pint');

  // Second round
  th.pour('Stout', 'Alice', 12);
  th.pour('Hazy IPA', 'Bob', 16, 'second round');
  th.pour('Amber Ale', 'Charlie', 16, 'switched');

  return th;
}

if (require.main === module) {
  const th = seedTapHouse();
  console.log(`Seeded tap house with ${th.kegs().length} kegs and ${th.tabs().length} tabs`);
  console.log(`Total pours: ${th.logEntries().length}`);
  console.log(`Total volume: ${th.totalPoured()} oz`);
}

module.exports = { seedTapHouse };
