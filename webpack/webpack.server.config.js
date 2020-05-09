var path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './server/index.ts'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$|\.tsx$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          },
          'stylelint-custom-processor-loader'
        ]
      },
      {
        test: /\.(png|jpeg)$/,
        use: ['url-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/public'),
    compress: true,
    port: 9001,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/query': {
        target: 'http://127.0.0.1:5000'
      }
    }
  },
  output: {
    path: __dirname + '/../dist/',
    filename: 'server.js'
  },
  stats: {
    // Logging in the console: alternatively  " stats: 'minimal' " for less and " stats: 'verbose' " for more
    assets: true, // The big green blob of bundle sizes
    cached: false, // Don't display cached items
    cachedAssets: false, // Don't display asset if already displaid once
    assetsSort: '!size',
    version: false, // Webpack version
    entrypoints: false, // verbose
    modules: false // verbose
  },
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
