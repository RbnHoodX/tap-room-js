#!/usr/bin/env node
/**
 * Command-line interface for the tap room management system.
 * Provides interactive commands for managing kegs, tabs, and pours.
 */

const { TapHouse } = require('./taphouse');
const { formatKegStatus, formatTabStatus, formatDispensation } = require('../utils/formatting');
const { isPositiveNumber, isNonEmptyString } = require('../utils/validation');

class TapRoomCLI {
  constructor() {
    this.tapHouse = new TapHouse();
    this.commands = new Map();
    this._registerCommands();
  }

  _registerCommands() {
    this.commands.set('create-keg', {
      usage: 'create-keg <name> <capacity>',
      description: 'Create a new keg with the given name and capacity in oz',
      handler: (args) => this._createKeg(args),
    });

    this.commands.set('open-tab', {
      usage: 'open-tab <name> <limit>',
      description: 'Open a new tab with the given name and credit limit',
      handler: (args) => this._openTab(args),
    });

    this.commands.set('open-subtab', {
      usage: 'open-subtab <parent> <name> <limit>',
      description: 'Open a sub-tab under an existing parent tab',
      handler: (args) => this._openSubTab(args),
    });

    this.commands.set('pour', {
      usage: 'pour <keg> <tab> <amount> [memo]',
      description: 'Pour from a keg to a tab',
      handler: (args) => this._pour(args),
    });

    this.commands.set('status', {
      usage: 'status',
      description: 'Show status of all kegs and tabs',
      handler: () => this._status(),
    });

    this.commands.set('log', {
      usage: 'log',
      description: 'Show all dispensation log entries',
      handler: () => this._log(),
    });

    this.commands.set('kegs', {
      usage: 'kegs',
      description: 'List all kegs with remaining capacity',
      handler: () => this._listKegs(),
    });

    this.commands.set('tabs', {
      usage: 'tabs',
      description: 'List all tabs with current balances',
      handler: () => this._listTabs(),
    });

    this.commands.set('help', {
      usage: 'help [command]',
      description: 'Show help for a specific command or list all commands',
      handler: (args) => this._help(args),
    });
  }

  run(commandLine) {
    const parts = commandLine.trim().split(/\s+/);
    const cmdName = parts[0];
    const args = parts.slice(1);

    const cmd = this.commands.get(cmdName);
    if (!cmd) {
      return { success: false, message: `Unknown command: ${cmdName}. Type 'help' for available commands.` };
    }

    try {
      return cmd.handler(args);
    } catch (e) {
      return { success: false, message: `Error: ${e.message}` };
    }
  }

  _createKeg(args) {
    if (args.length < 2) {
      return { success: false, message: 'Usage: create-keg <name> <capacity>' };
    }
    const name = args[0];
    const capacity = parseFloat(args[1]);
    if (!isPositiveNumber(capacity)) {
      return { success: false, message: 'Capacity must be a positive number' };
    }
    const keg = this.tapHouse.createKeg(name, capacity);
    return { success: true, message: `Created keg '${keg.name}' with ${keg.capacity} oz capacity` };
  }

  _openTab(args) {
    if (args.length < 2) {
      return { success: false, message: 'Usage: open-tab <name> <limit>' };
    }
    const name = args[0];
    const limit = parseFloat(args[1]);
    if (!isPositiveNumber(limit)) {
      return { success: false, message: 'Limit must be a positive number' };
    }
    const tab = this.tapHouse.openTab(name, limit);
    return { success: true, message: `Opened tab '${tab.name}' with ${tab.limit} limit` };
  }

  _openSubTab(args) {
    if (args.length < 3) {
      return { success: false, message: 'Usage: open-subtab <parent> <name> <limit>' };
    }
    const [parentName, name] = args;
    const limit = parseFloat(args[2]);
    const child = this.tapHouse.openSubTab(parentName, name, limit);
    return { success: true, message: `Opened sub-tab '${child.name}' under '${parentName}'` };
  }

  _pour(args) {
    if (args.length < 3) {
      return { success: false, message: 'Usage: pour <keg> <tab> <amount> [memo]' };
    }
    const [kegName, tabName] = args;
    const amount = parseFloat(args[2]);
    const memo = args.slice(3).join(' ') || '';
    if (!isPositiveNumber(amount)) {
      return { success: false, message: 'Amount must be a positive number' };
    }
    const d = this.tapHouse.pour(kegName, tabName, amount, memo);
    return { success: true, message: `Poured ${d.amount} oz from '${kegName}' to '${tabName}' (entry #${d.id})` };
  }

  _status() {
    const lines = [];
    lines.push('=== KEGS ===');
    for (const keg of this.tapHouse.kegs()) {
      lines.push('  ' + formatKegStatus(keg));
    }
    lines.push('');
    lines.push('=== TABS ===');
    for (const tab of this.tapHouse.tabs()) {
      lines.push('  ' + formatTabStatus(tab));
    }
    lines.push('');
    lines.push(`Total poured: ${this.tapHouse.totalPoured()} oz`);
    return { success: true, message: lines.join('\n') };
  }

  _log() {
    const entries = this.tapHouse.logEntries();
    if (entries.length === 0) {
      return { success: true, message: 'No log entries yet.' };
    }
    const lines = entries.map(d => '  ' + formatDispensation(d));
    return { success: true, message: lines.join('\n') };
  }

  _listKegs() {
    const kegs = this.tapHouse.kegs();
    if (kegs.length === 0) {
      return { success: true, message: 'No kegs registered.' };
    }
    const lines = kegs.map(k => `  ${k.name}: ${k.remaining}/${k.capacity} oz`);
    return { success: true, message: lines.join('\n') };
  }

  _listTabs() {
    const tabs = this.tapHouse.tabs();
    if (tabs.length === 0) {
      return { success: true, message: 'No tabs open.' };
    }
    const lines = tabs.map(t => {
      const parentInfo = t.parent ? ` [sub-tab of ${t.parent.name}]` : '';
      return `  ${t.name}: ${t.balance}/${t.limit}${parentInfo}`;
    });
    return { success: true, message: lines.join('\n') };
  }

  _help(args) {
    if (args && args.length > 0) {
      const cmd = this.commands.get(args[0]);
      if (!cmd) {
        return { success: false, message: `Unknown command: ${args[0]}` };
      }
      return { success: true, message: `${cmd.usage}\n  ${cmd.description}` };
    }
    const lines = ['Available commands:'];
    for (const [name, cmd] of this.commands) {
      lines.push(`  ${name.padEnd(16)} ${cmd.description}`);
    }
    return { success: true, message: lines.join('\n') };
  }

  availableCommands() {
    return [...this.commands.keys()];
  }
}

module.exports = { TapRoomCLI };
