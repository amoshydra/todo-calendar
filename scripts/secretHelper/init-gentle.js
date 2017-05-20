const shell = require('shelljs');
const core = require('./core');

if (!core.isInitialised()) {
  shell.echo('Initialising secret');
  core.initialiseSecret();
}

const env = core.normaliseNodeEnv();
const keysStatus = core.getStatus(env);
const messages = core.getMessages(keysStatus, env);

shell.echo(`
Configuration status:

  [${(keysStatus.development) ? '/' : 'X'}] Development key
  [${(keysStatus.production) ? '/' : 'X'}] Production key
`);

messages.forEach((message) => {
  shell.echo(`    ${message}`);
});
