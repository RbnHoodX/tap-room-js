#!/usr/bin/env node
/**
 * Generate a text report from a seeded tap house.
 */

const { seedTapHouse } = require('./seed');
const { dailySummary } = require('../reports/summary');
const { kegRanking, tabRanking, pourDistribution } = require('../reports/statistics');
const { formatSummaryReport, formatRanking, formatDistribution } = require('../reports/formatter');
const { exportToText } = require('../storage/exporter');

function generateReport() {
  const th = seedTapHouse();

  const summary = dailySummary(th);
  console.log(formatSummaryReport(summary));
  console.log('');

  const kRanking = kegRanking(th);
  console.log(formatRanking(kRanking, 'Keg Usage (by volume poured)'));
  console.log('');

  const tRanking = tabRanking(th);
  console.log(formatRanking(tRanking, 'Tab Balances (highest first)'));
  console.log('');

  const dist = pourDistribution(th.logEntries());
  console.log('Pour Distribution:');
  console.log('  ' + formatDistribution(dist));
  console.log('');

  console.log(exportToText(th));
}

if (require.main === module) {
  generateReport();
}

module.exports = { generateReport };
