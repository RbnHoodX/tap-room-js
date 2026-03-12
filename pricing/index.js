const calculator = require('./calculator');
const discounts = require('./discounts');
const currency = require('./currency');

module.exports = { ...calculator, ...discounts, ...currency };
