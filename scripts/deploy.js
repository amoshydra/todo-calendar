const shell = require('shelljs');
const config = require('../config').deploy;

// Check if dist folder exist
const hasDist = (
  shell.test('-d', config.distPath) &&
  shell.test('-f', `${config.distPath}/index.html`)
);

if (!hasDist) {
  shell.echo(`
    The app has not been built yet.
    Please run "yarn run build" before this.
  `);
  process.exit(1);
} else {
  shell.echo(`
    Found app in:
     > "${config.distPath}"
    Deploying app to "${config.domain}.surge.sh"
  `);
}

const normalizedPath = config.distPath.replace(/\\/g, '/');
shell.exec(`surge --project "${normalizedPath}" --domain "${config.domain}"`);
