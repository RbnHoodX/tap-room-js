class Tab {
  constructor(name, limit) {
    this._name = name;
    this._limit = limit;
    this._dispensations = [];
    this._children = [];
    this._parent = null;
  }

  get name() { return this._name; }
  get limit() { return this._limit; }
  get parent() { return this._parent; }

  get balance() {
    let total = 0;
    for (const d of this._dispensations) {
      total += d.amount;
    }
    return total;
  }

  children() {
    return [...this._children];
  }

  _addChild(tab) {
    tab._parent = this;
    this._children.push(tab);
  }

  _addDispensation(dispensation) {
    this._dispensations.push(dispensation);
  }

  dispensations() {
    return [...this._dispensations];
  }
}

module.exports = { Tab };
