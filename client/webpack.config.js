const webpack = require('webpack');
const path = require('path');

module.exports = {
  //Where the app will start (webpack will start building files from here)
  entry: "./src/index.js",
  mode: "development",
  //where the bundled up files will be placed
  //publicPath property will be used by webpack-dev-server to properly serve website
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "./dist/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
        
      }
    ]
  },
  //setup webpack-dev-server:
  //  PORT to run on
  //  publicPath - where the bundled code is
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3001,
    publicPath: "http://localhost:3001/dist/",
    hotOnly: true,
    proxy: {
      '/api/*': {
          target: 'http://localhost:3000',
          secure: false
      }
    }
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
}