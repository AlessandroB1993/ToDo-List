const path = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");
const { plugins, output } = require("./webpack.prod");

module.exports = {
  entry: {
    app: "./src/js/index.js",
  },
  plugins: [
    new HtmlWepackPlugin({
      title: "Production",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
