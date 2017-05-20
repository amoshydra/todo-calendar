const shell = require('shelljs');
const core = require('./core');

if (!core.isInitialised()) {
  shell.echo('Initialising secret');
  core.initialiseSecret();
}

const env = core.normaliseNodeEnv();
const keysStatus = core.getStatus(env);
const messages = [];
core.getMessages(keysStatus, env, messages);

shell.echo(`
Configuration status:

  [${(keysStatus.development) ? '/' : 'X'}] Development key
  [${(keysStatus.production) ? '/' : 'X'}] Production key
`);

messages.push('If you see error with your client_id, double check your');
messages.push('settings in the Google Developer Console.');
messages.push('');

messages.forEach((message) => {
  shell.echo(`    ${message}`);
});
