const path = require('path');

module.exports = {
  root: true,
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/strongly-recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.vue', '.ts'],
            alias: {
              '~': __dirname,
              '~~': __dirname,
              '@': __dirname,
              '@@': __dirname,
              'static': path.resolve(__dirname, 'static'), // use in template with <img src="~static/nuxt.png" />
              '~static': path.resolve(__dirname, 'static'),
              'assets': path.resolve(__dirname, 'assets'), // use in template with <img src="~static/nuxt.png" />
              '~assets': path.resolve(__dirname, 'assets'),
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
      'vue': 'never'
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
    "max-len": [
      "warn", 120, 2,
      { ignoreComments: true }
    ],
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
