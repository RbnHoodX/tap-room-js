const { Keg } = require('./keg');
const { Tab } = require('./tab');
const { Dispensation, BarLog } = require('./dispensation');

class TapHouse {
  constructor() {
    this._kegs = new Map();
    this._tabs = new Map();
    this._barLog = new BarLog();
  }

  createKeg(name, capacity) {
    if (this._kegs.has(name)) {
      throw new Error(`keg '${name}' already exists`);
    }
    const keg = new Keg(name, capacity);
    this._kegs.set(name, keg);
    return keg;
  }

  getKeg(name) {
    const keg = this._kegs.get(name);
    if (!keg) {
      throw new Error(`keg '${name}' not found`);
    }
    return keg;
  }

  openTab(name, limit) {
    if (this._tabs.has(name)) {
      throw new Error(`tab '${name}' already exists`);
    }
    const tab = new Tab(name, limit);
    this._tabs.set(name, tab);
    return tab;
  }

  openSubTab(parentName, childName, limit) {
    const parent = this.getTab(parentName);
    if (this._tabs.has(childName)) {
      throw new Error(`tab '${childName}' already exists`);
    }
    const child = new Tab(childName, limit);
    this._tabs.set(childName, child);
    parent._addChild(child);
    return child;
  }

  getTab(name) {
    const tab = this._tabs.get(name);
    if (!tab) {
      throw new Error(`tab '${name}' not found`);
    }
    return tab;
  }

  kegs() {
    return [...this._kegs.values()];
  }

  tabs() {
    return [...this._tabs.values()];
  }

  pour(kegName, tabName, amount, memo = '') {
    if (amount <= 0) {
      throw new Error('amount must be positive');
    }
    const keg = this.getKeg(kegName);
    const tab = this.getTab(tabName);
    const entry = new Dispensation(keg, tab, amount, memo);
    this._barLog.record(entry);
    return entry;
  }

  logEntries() {
    return this._barLog.entries();
  }

  totalPoured() {
    let total = 0;
    for (const d of this._barLog.entries()) {
      total += d.amount;
    }
    return total;
  }
}

module.exports = { TapHouse };
