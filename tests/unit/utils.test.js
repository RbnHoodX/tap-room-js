const assert = require('assert');
const { formatVolume, formatCurrency, truncate, padRight } = require('../../utils/formatting');
const { isPositiveNumber, isNonEmptyString, isValidName, sanitizeName } = require('../../utils/validation');
const { caseInsensitiveMatch, sortByField, groupBy, uniqueValues } = require('../../utils/search');

// formatting
assert.strictEqual(formatVolume(16), '16.0 oz');
assert.strictEqual(formatVolume(256), '2.00 gal');
assert.strictEqual(formatCurrency(1050), '$10.50');
assert.strictEqual(formatCurrency(-500), '-$5.00');
assert.strictEqual(truncate('hello world', 8), 'hello...');
assert.strictEqual(truncate('hi', 10), 'hi');
assert.strictEqual(padRight('ab', 5), 'ab   ');

// validation
assert.strictEqual(isPositiveNumber(5), true);
assert.strictEqual(isPositiveNumber(0), false);
assert.strictEqual(isPositiveNumber(-1), false);
assert.strictEqual(isPositiveNumber('5'), false);
assert.strictEqual(isNonEmptyString('hello'), true);
assert.strictEqual(isNonEmptyString(''), false);
assert.strictEqual(isNonEmptyString('  '), false);
assert.strictEqual(isValidName('IPA-Gold'), true);
assert.strictEqual(isValidName(''), false);
assert.strictEqual(sanitizeName('  hello   world  '), 'hello world');

// search
assert.strictEqual(caseInsensitiveMatch('IPA', 'ipa'), true);
assert.strictEqual(caseInsensitiveMatch('IPA', 'Stout'), false);
const items = [{ name: 'Charlie', v: 3 }, { name: 'alice', v: 1 }, { name: 'Bob', v: 2 }];
const sorted = sortByField(items, 'name');
assert.strictEqual(sorted[0].name, 'alice');
const grouped = groupBy([1, 2, 3, 4], x => x % 2 === 0 ? 'even' : 'odd');
assert.strictEqual(grouped.get('even').length, 2);
const uniq = uniqueValues([{ x: 'a' }, { x: 'b' }, { x: 'a' }], 'x');
assert.strictEqual(uniq.length, 2);

console.log('utils.test.js: all passed');
