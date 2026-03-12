class Keg {
  constructor(name, capacity) {
    this._name = name;
    this._capacity = capacity;
    this._dispensations = [];
  }

  get name() { return this._name; }
  get capacity() { return this._capacity; }

  get remaining() {
    let used = 0;
    for (const d of this._dispensations) {
      used += d.amount;
    }
    return this._capacity - used;
  }

  _addDispensation(dispensation) {
    this._dispensations.push(dispensation);
  }

  dispensations() {
    return [...this._dispensations];
  }
}

module.exports = { Keg };
