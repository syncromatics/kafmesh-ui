var path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './public/index.html',
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
          'stylelint-custom-processor-loader',
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/public'),
    compress: true,
    port: 9001,
    progress: true,
  },
  stats: {
    // Logging in the console: alternatively  " stats: 'minimal' " for less and " stats: 'verbose' " for more
    assets: true, // The big green blob of bundle sizes
    cached: false, // Don't display cached items
    cachedAssets: false, // Don't display asset if already displaid once
    assetsSort: '!size',
    version: false, // Webpack version
    entrypoints: false, // verbose
    modules: false, // verbose
  },
};
