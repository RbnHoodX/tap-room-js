/**
 * Search and filter utilities for querying tap room data.
 * Handles case-insensitive matching, sorting, and grouping.
 */

function caseInsensitiveMatch(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  return a.toLowerCase() === b.toLowerCase();
}

function caseInsensitiveContains(haystack, needle) {
  if (typeof haystack !== 'string' || typeof needle !== 'string') return false;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function sortByField(items, field, descending = false) {
  const copy = [...items];
  copy.sort((a, b) => {
    const va = a[field];
    const vb = b[field];
    if (typeof va === 'string' && typeof vb === 'string') {
      const cmp = va.localeCompare(vb, undefined, { sensitivity: 'base' });
      return descending ? -cmp : cmp;
    }
    if (va < vb) return descending ? 1 : -1;
    if (va > vb) return descending ? -1 : 1;
    return 0;
  });
  return copy;
}

function groupBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

function uniqueValues(items, fieldOrFn) {
  const seen = new Set();
  const fn = typeof fieldOrFn === 'function'
    ? fieldOrFn
    : (item) => item[fieldOrFn];
  for (const item of items) {
    const val = fn(item);
    if (val !== undefined && val !== null) seen.add(val);
  }
  return [...seen];
}

function filterByRange(items, field, min, max) {
  return items.filter(item => {
    const v = item[field];
    return typeof v === 'number' && v >= min && v <= max;
  });
}

function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page, pageSize,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

module.exports = {
  caseInsensitiveMatch, caseInsensitiveContains, sortByField,
  groupBy, uniqueValues, filterByRange, paginate,
};
