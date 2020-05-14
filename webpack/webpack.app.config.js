var path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'src/index.html',
  filename: './index.html',
  favicon: 'src/favicon.png'
});

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/index.tsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$|\.tsx$/,
        exclude: [
          "/node_modules/",
          "/server/",
        ],
        loader: 'ts-loader',
        options: {
          configFile: "../tsconfig.json"
        }
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
  plugins: [htmlPlugin],
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
        target: 'http://127.0.0.1:5000',
        ws: true
      }
    }
  },
  output: {
    path: __dirname + '/../dist/app',
    filename: 'bundle.js',
    publicPath: '/'
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
  }
};
