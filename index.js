const { Compilation, sources } = require('webpack');
const path = require('path');
class CollectAsset {
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    const compilerOptions = compiler.options || {};
    this.options = {
      // 输出目录
      path: compilerOptions.output.path,
      // 输出目录下 子目录
      pathPrefix: '',
      // 正则匹配规则
      regexp: /^$/,
      ...this.options
    };

    compiler.hooks.thisCompilation.tap('CollectAsset', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'CollectAsset',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER
        },
        (assets, cb) => {
          if (compilation.compiler.isChild()) {
            cb();
            return;
          }

          for (const asset in assets) {
            if (this.options.regexp.test(asset)) {
              const assetRaw = compilation.getAsset(asset);
              const outputPath = path.join(this.options.path, this.options.pathPrefix, path.basename(asset));
              const relativeOutputPath = path.relative(compilerOptions.output.path, outputPath);
              compilation.deleteAsset(asset);
              compilation.emitAsset(relativeOutputPath, assetRaw.source);
            }
          }

          cb();
        }
      );
    });
  }
}

module.exports = CollectAsset;
