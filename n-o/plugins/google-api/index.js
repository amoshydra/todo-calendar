import gapi from './main';

export default ({ app, env, store }, inject) => {
  inject('gapi', gapi);
};
