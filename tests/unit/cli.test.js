const assert = require('assert');
const { TapRoomCLI } = require('../../src/cli');

// basic instantiation
{
  const cli = new TapRoomCLI();
  assert(cli.availableCommands().length > 0);
  assert(cli.availableCommands().includes('help'));
  assert(cli.availableCommands().includes('pour'));
}

// create keg
{
  const cli = new TapRoomCLI();
  const r = cli.run('create-keg IPA 640');
  assert.strictEqual(r.success, true);
  assert(r.message.includes('IPA'));
}

// open tab and pour
{
  const cli = new TapRoomCLI();
  cli.run('create-keg Stout 640');
  cli.run('open-tab Alice 200');
  const r = cli.run('pour Stout Alice 16 tasting');
  assert.strictEqual(r.success, true);
  assert(r.message.includes('16'));
}

// invalid pour
{
  const cli = new TapRoomCLI();
  const r = cli.run('pour ghost ghost 10');
  assert.strictEqual(r.success, false);
}

// status with no data
{
  const cli = new TapRoomCLI();
  const r = cli.run('status');
  assert.strictEqual(r.success, true);
}

// help
{
  const cli = new TapRoomCLI();
  const r = cli.run('help');
  assert.strictEqual(r.success, true);
  assert(r.message.includes('pour'));
}

// unknown command
{
  const cli = new TapRoomCLI();
  const r = cli.run('unknown');
  assert.strictEqual(r.success, false);
}

// sub-tab workflow
{
  const cli = new TapRoomCLI();
  cli.run('create-keg IPA 640');
  cli.run('open-tab Table1 500');
  const r = cli.run('open-subtab Table1 Bob 200');
  assert.strictEqual(r.success, true);
  assert(r.message.includes('Bob'));
}

console.log('cli.test.js: all passed');
