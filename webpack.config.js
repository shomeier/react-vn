var path = require("path");
var config = {
  
  devtool: 'eval',

  entry: ["./src/App.tsx"],

  // configure the output directory and publicPath for the devServer
  output: {
    filename: 'bundle.js',
    publicPath: 'public',
    path: path.resolve(__dirname, "dist"),
  },


  // configure the dev server to run
  devServer: {
    port: 3000,
    historyApiFallback: true,
    inline: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
    modules: ['src', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve('src'),
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;