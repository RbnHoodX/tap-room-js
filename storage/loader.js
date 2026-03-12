/**
 * File loading utilities for reading tap room configuration
 * and data files from disk.
 */

const fs = require('fs');
const path = require('path');

function loadJSON(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }
  const content = fs.readFileSync(absPath, 'utf8');
  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error(`Failed to parse ${absPath}: ${e.message}`);
  }
}

function loadCSV(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }
  const content = fs.readFileSync(absPath, 'utf8');
  const lines = content.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((h, j) => {
      row[h] = values[j] || '';
    });
    rows.push(row);
  }
  return rows;
}

function loadTextLines(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    return [];
  }
  return fs.readFileSync(absPath, 'utf8').split('\n').filter(l => l.trim());
}

function fileExists(filePath) {
  return fs.existsSync(path.resolve(filePath));
}

function getFileSize(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) return 0;
  return fs.statSync(absPath).size;
}

module.exports = { loadJSON, loadCSV, loadTextLines, fileExists, getFileSize };
