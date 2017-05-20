/**
 * This script will initialise all the necessary key file,
 * and place them where the developer can configure.
 *
 * This script is used by package.json.
 * It will check if the developer has modified the secret key
 * before running certain script in package.json.
 */

const shell = require('shelljs');
const path = require('path');
const sampleJson = require('./samples/keys.sample.js');
const config = require('../../config');

function isInitialised() {
  return (
    shell.test('-d', secretsHelper.secretsPath) &&
    shell.test('-f', path.join(secretsHelper.secretsPath, 'keys.js'))
  );
}

function initialiseSecret() {
  shell.mkdir('-p', secretsHelper.secretsPath);
  shell.cp(
    path.join(__dirname, 'samples/keys.sample.js'),
    secretsHelper.secretsPath
  );

  const keyFilePath = path.join(secretsHelper.secretsPath, 'keys.js');

  shell.mv(
    path.join(secretsHelper.secretsPath, 'keys.sample.js'),
    keyFilePath
  );

  shell.sed('-i', /<% PORT %>/g, config.dev.port, keyFilePath);
  shell.sed('-i', /<% DOMAIN %>/g, config.deploy.domain, keyFilePath);
  shell.sed('-i', /<% WARNING %>/g, 'Never commit this file into the repo.', keyFilePath);
}

function isDevelopConfigured() {
  /* eslint import/no-dynamic-require: 0 */
  /* eslint global-require: 0 */
  const secretsJson = require(path.join(secretsHelper.secretsPath, 'keys.js'));
  return secretsJson.development.client_id !== sampleJson.development.client_id;
}

function isDeployConfigured() {
  /* eslint import/no-dynamic-require: 0 */
  /* eslint global-require: 0 */
  const secretsJson = require(path.join(secretsHelper.secretsPath, 'keys.js'));
  return secretsJson.production.client_id !== sampleJson.production.client_id;
}

function normaliseNodeEnv() {
  const env = {};
  if (process.env.NODE_ENV === 'production') {
    env.nodeEnv = 'production'; env.altEnv = 'development';
  } else {
    env.nodeEnv = 'development'; env.altEnv = 'production';
  }
  return env;
}

function getStatus(env) {
  const keysStatus = {
    production: isDeployConfigured(),
    development: isDevelopConfigured(),
    conclusion: 'READY_FOR_NONE'
  };

  if (keysStatus.development && keysStatus.production) {
    keysStatus.conclusion = 'READY_FOR_BOTH';
  } else if (env.nodeEnv === 'production' && keysStatus.production) {
    keysStatus.conclusion = 'READY_FOR_PRODUCTION';
  } else if (env.nodeEnv === 'development' && keysStatus.development) {
    keysStatus.conclusion = 'READY_FOR_DEVELOPMENT';
  }
  return keysStatus;
}

function getMessages(keysStatus = { conclusion: 'READY_FOR_NONE' }, env, messages = []) {
  switch (keysStatus.conclusion) {
    case 'READY_FOR_BOTH':
      messages.push('Well done! You have changed the keys for both production and development.');
      break;
    case 'READY_FOR_PRODUCTION':
    case 'READY_FOR_DEVELOPMENT':
      messages.push(`Nice! You have changed the keys for ${env.nodeEnv}.`);
      messages.push(`* You may need to set up a ${env.altEnv} key for ${env.altEnv}.`);
      break;
    default: break;
  }

  if (keysStatus.conclusion !== 'READY_FOR_NONE') {
    messages.push('');
  } else {
    messages.push(`Unable to proceed. You must configure your ${env.nodeEnv} key.`);
    messages.push('Please check the instruction in \'config/secrets/keys\'.');
    messages.push('');
  }
  return messages;
}

function updateSourceCode(nodeEnv, messages = []) {
  const secretsJson = require(path.join(secretsHelper.secretsPath, 'keys.js'));

  nodeEnv = nodeEnv || 'development';

  /* eslint camelcase: 0 */
  const client_id = secretsJson[nodeEnv].client_id;
  const sourceCodeKey = {
    google: { client_id, }
  };
  const sourceCodeKeyString = JSON.stringify(sourceCodeKey);

  // Update source code's key
  const srcSecretPath = path.join(__dirname, '../../src/secrets');
  const secretFilepath = path.join(srcSecretPath, 'keys.json');

  shell.mkdir('-p', srcSecretPath);
  shell.rm('-f', secretFilepath);
  shell.ShellString(sourceCodeKeyString).to(secretFilepath);

  messages.push(`The secret key for [${nodeEnv}] has been injected.`);
  messages.push('');
}

const secretsHelper = {
  secretsPath: path.join(__dirname, '../../config/secrets'),
  isInitialised,
  initialiseSecret,
  isDevelopConfigured,
  isDeployConfigured,
  normaliseNodeEnv,
  getStatus,
  getMessages,
  updateSourceCode,
};

module.exports = secretsHelper;
