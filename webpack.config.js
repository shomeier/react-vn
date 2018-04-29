var path = require("path");
const CircularDependencyPlugin = require('circular-dependency-plugin');

var config = {

  devtool: 'source-map',
  // devtool: 'eval',

  entry: ["./src/index.tsx"],

  // configure the output directory and publicPath for the devServer
  output: {
    filename: 'bundle.js',
    publicPath: 'dist',
    path: path.resolve(__dirname, "dist"),
  },


  // configure the dev server to run
  devServer: {
    port: 3000,
    // contentBase: './dist',
    historyApiFallback: true,
    inline: true,
    // hot: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
    modules: ['src', 'node_modules'],
  },

  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        include: path.resolve('src/assets'),
      }
    ]
  }
};

module.exports = config;