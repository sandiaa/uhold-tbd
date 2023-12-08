const webpack = require('webpack');

module.exports = function override(config, env) {
  if (!env || !env.startsWith('production')) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.NormalModuleReplacementPlugin(
        /node:crypto/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        }
      )
    );
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
  }
  return config;
};
