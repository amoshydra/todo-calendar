const path = require('path');

const sourceDir = path.resolve(process.cwd(), 'src');
const staticDir = path.resolve(sourceDir, 'static');
const assetsDir = path.resolve(sourceDir, 'assets');

module.exports = {
  root: true,
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.vue', '.ts'],
            alias: {
              '~': sourceDir,
              '~~': sourceDir,
              '@': sourceDir,
              '@@': sourceDir,
              'static': staticDir, // use in template with <img src="~static/nuxt.png" />
              '~static': staticDir,
              'assets': assetsDir, // use in template with <img src="~static/nuxt.png" />
              '~assets': assetsDir,
            }
          }
        }
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'ts': 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "indent": [
      "error", 2,
      { "SwitchCase": 1 }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "semi-style": "off",
    "no-console": "warn",
    "linebreak-style": "off",
    "quote-props": [
      "warn",
      "consistent-as-needed"
    ],
    "no-cond-assign": [
      "off",
      "except-parens"
    ],
    "radix": "off",
    "space-infix-ops": "off",
    "no-use-before-define": "off",
    "no-unused-vars": [
      "warn",
      {
        "vars": "local",
        "args": "none",
        "argsIgnorePattern": "next"
      }
    ],
    "default-case": "error",
    "no-else-return": "off",
    "no-param-reassign": "off",
    "space-before-function-paren": [
      "warn",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "ignore"
      }
    ],
    "eqeqeq": ["error", "smart"],
    "comma-dangle": "off",
    "func-names": "warn",
    "prefer-arrow-callback": "warn",
    "object-shorthand": "warn",
    "prefer-const": "warn",
    "arrow-body-style": "warn",
  }
}
