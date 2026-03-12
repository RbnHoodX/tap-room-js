class Tab {
  constructor(name, limit) {
    this._name = name;
    this._limit = limit;
    this._dispensations = [];
  }

  get name() { return this._name; }
  get limit() { return this._limit; }

  get balance() {
    let total = 0;
    for (const d of this._dispensations) {
      total += d.amount;
    }
    return total;
  }

  _addDispensation(dispensation) {
    this._dispensations.push(dispensation);
  }

  dispensations() {
    return [...this._dispensations];
  }
}

module.exports = { Tab };
