/**
 * Input validation helpers for the tap room system.
 * Provides reusable checks for common constraints.
 */

function isPositiveNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidName(name) {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  return /^[a-zA-Z0-9\s\-_'.]+$/.test(trimmed);
}

function isValidCapacity(cap) {
  return isPositiveNumber(cap) && Number.isFinite(cap) && cap <= 100000;
}

function isValidLimit(limit) {
  return isPositiveNumber(limit) && Number.isFinite(limit);
}

function isWithinRange(value, min, max) {
  return typeof value === 'number' && value >= min && value <= max;
}

function sanitizeName(name) {
  if (typeof name !== 'string') return '';
  return name.trim().replace(/\s+/g, ' ');
}

function validatePourParams(amount, kegName, tabName) {
  const errors = [];
  if (!isPositiveNumber(amount)) {
    errors.push('amount must be a positive number');
  }
  if (!isNonEmptyString(kegName)) {
    errors.push('kegName must be a non-empty string');
  }
  if (!isNonEmptyString(tabName)) {
    errors.push('tabName must be a non-empty string');
  }
  return errors;
}

function assertType(value, expectedType, fieldName) {
  const actual = typeof value;
  if (actual !== expectedType) {
    throw new TypeError(
      `${fieldName} must be ${expectedType}, got ${actual}`
    );
  }
}

module.exports = {
  isPositiveNumber, isNonNegativeNumber, isNonEmptyString,
  isValidName, isValidCapacity, isValidLimit, isWithinRange,
  sanitizeName, validatePourParams, assertType,
};
