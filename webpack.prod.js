const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env.production" });
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const prodConfig = {
  mode: "production",
  output: {
    path: path.join(__dirname, "build"),
    chunkFilename: `static/js/[id].[contenthash].js`,
    hashFunction: "xxhash64",
    filename: `static/js/[name].[contenthash].js`,
    assetModuleFilename: "static/assets/[name][ext][query]",
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: process.env.PUBLIC_URL,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          force: true,
          filter: async (resourcePath) => {
            if (resourcePath.includes("index.html")) {
              return false;
            }
            return true;
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { format: { comments: false }, compress: true },
      }),
      new CssMinimizerPlugin({
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cleanCssMinify,
        ],
        parallel: true,
      }),
    ],
  },
};

module.exports = (env) => {
  return merge(commonConfig(env), prodConfig);
};
