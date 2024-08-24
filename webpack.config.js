const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.tsx', // Entry point for your content script
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',  // Output will be content.bundle.js
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/manifest.json', to: '.' },
            { from: 'public', to: '.' },
        ],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
};
