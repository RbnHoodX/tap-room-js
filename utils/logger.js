/**
 * Simple logging utility for the tap room system.
 * Supports different log levels and formatted output.
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
};

class Logger {
  constructor(name, level = LOG_LEVELS.INFO) {
    this._name = name;
    this._level = level;
    this._entries = [];
  }

  get name() { return this._name; }
  get level() { return this._level; }

  setLevel(level) {
    this._level = level;
  }

  _format(level, message) {
    const timestamp = new Date().toISOString();
    const levelName = Object.keys(LOG_LEVELS).find(k => LOG_LEVELS[k] === level) || 'UNKNOWN';
    return `[${timestamp}] [${levelName}] [${this._name}] ${message}`;
  }

  _log(level, message) {
    if (level < this._level) return;
    const formatted = this._format(level, message);
    this._entries.push({ level, message, formatted, timestamp: Date.now() });
    if (level >= LOG_LEVELS.ERROR) {
      console.error(formatted);
    } else if (level >= LOG_LEVELS.WARN) {
      console.warn(formatted);
    } else {
      console.log(formatted);
    }
  }

  debug(msg) { this._log(LOG_LEVELS.DEBUG, msg); }
  info(msg) { this._log(LOG_LEVELS.INFO, msg); }
  warn(msg) { this._log(LOG_LEVELS.WARN, msg); }
  error(msg) { this._log(LOG_LEVELS.ERROR, msg); }

  getEntries(minLevel = LOG_LEVELS.DEBUG) {
    return this._entries.filter(e => e.level >= minLevel);
  }

  clear() {
    this._entries = [];
  }

  count(minLevel = LOG_LEVELS.DEBUG) {
    return this.getEntries(minLevel).length;
  }
}

function createLogger(name, level) {
  return new Logger(name, level);
}

module.exports = { Logger, LOG_LEVELS, createLogger };
