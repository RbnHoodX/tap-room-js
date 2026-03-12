const summary = require('./summary');
const statistics = require('./statistics');
const formatter = require('./formatter');

module.exports = { ...summary, ...statistics, ...formatter };
