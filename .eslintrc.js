/*
ESLint 的配置文件
http://eslint.cn/docs/user-guide/configuring
*/

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 0,
    // 关闭 var 关键字的提示
    'no-var': 0,
    'no-debugger': 0,
  },
}
