# collect-asset

将符合正则规则的资源，移到指定的目录中

## 安装

`npm install --save-dev collect-asset`

## 使用

```js
const CollectAsset = require('collect-asset`');
module.exports = {
  plugins: [
    new CollectAsset({
      // 输出目录：必填
      path: 'dist',
      // 子目录：非必填
      pathPrefix: '',
      // 匹配规则：必填
      regexp: /\.map$/
    }),
  ]
}
```
