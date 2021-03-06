const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  'root': true,
  'parserOptions': {
    'parser': 'babel-eslint',
  },
  'env': {
    'browser': true,
  },
  'plugins': [
    'vue',
    'prettier',
  ],
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  'extends': [
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js',
      },
    },
  },
  'rules': {
    'prettier/prettier': 'error',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      'props': true,
      'ignorePropertyModificationsFor': [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'item', // for item.returnvalue
        'Vue', // for item.returnvalue
      ],
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js'],
    }],
    // allow debugger during development
    'no-debugger': isProduction ? 'error' : 'off',
    'quote-props': [2, 'consistent'],
    'import/prefer-default-export': [0],
    'no-console': isProduction ? 'error' : 'off',
    'no-alert': isProduction ? 'error' : 'off',
    'linebreak-style': 'off',
    'global-require': 'off',
    'object-shorthand': [2, 'always', { 'avoidQuotes': false }],
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-unresolved': 'off',
    'no-script-url': 'off',
    'semi': 'off',
  },
}
