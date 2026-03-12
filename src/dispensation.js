class Dispensation {
  constructor(keg, tab, amount, memo = '') {
    this._id = 0;
    this._keg = keg;
    this._tab = tab;
    this._amount = amount;
    this._memo = memo;
  }

  get id() { return this._id; }
  set id(value) { this._id = value; }
  get keg() { return this._keg; }
  get tab() { return this._tab; }
  get amount() { return this._amount; }
  get memo() { return this._memo; }
}

class BarLog {
  constructor() {
    this._entries = [];
    this._counter = 0;
  }

  record(dispensation) {
    this._counter += 1;
    dispensation.id = this._counter;
    this._entries.push(dispensation);
    dispensation.keg._addDispensation(dispensation);
    dispensation.tab._addDispensation(dispensation);
    return dispensation;
  }

  entries() {
    return [...this._entries];
  }
}

module.exports = { Dispensation, BarLog };
