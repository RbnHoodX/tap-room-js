/**
 * Application constants for the tap room system.
 */

const VOLUME_UNITS = {
  OZ: 'oz',
  ML: 'ml',
  PINT: 'pint',
  LITER: 'liter',
};

const DEFAULT_CAPACITY = 640; // 5 gallons in oz
const MAX_CAPACITY = 31680; // quarter barrel in oz
const MIN_POUR = 0.5;
const MAX_TAB_LIMIT = 50000;

const KEG_SIZES = {
  SIXTEL: 640,      // 1/6 barrel
  QUARTER: 992,     // quarter barrel
  SLIM_QUARTER: 992,
  HALF: 1984,       // half barrel (full keg)
  PONY: 992,
};

const STATUS = {
  ACTIVE: 'active',
  SETTLED: 'settled',
  VOIDED: 'voided',
  PENDING: 'pending',
};

const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

const EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
  TEXT: 'text',
};

module.exports = {
  VOLUME_UNITS, DEFAULT_CAPACITY, MAX_CAPACITY, MIN_POUR,
  MAX_TAB_LIMIT, KEG_SIZES, STATUS, SORT_DIRECTIONS, EXPORT_FORMATS,
};
