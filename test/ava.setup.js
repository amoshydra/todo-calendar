const path = require('path');
const moduleAlias = require('module-alias');
const hooks = require('require-extension-hooks');
const Vue = require('vue');

moduleAlias.addAliases({
  '@': path.resolve(process.cwd(), 'src'),
  '~': path.resolve(process.cwd(), 'src'),
});

Vue.config.productionTip = false;
Vue.config.devtools = false;

hooks('vue')
  .plugin('vue')
  .push()
;
hooks('ts')
  .plugin('module')
  .push()
;
hooks('ts')
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('typescript')
  .push()
;
