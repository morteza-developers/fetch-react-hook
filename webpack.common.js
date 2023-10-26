// const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  const plugins = [
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: path.join(__dirname, "public", "index.html"),
    // }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    // new MiniCssExtractPlugin({
    //   filename: "static/css/[name].css",
    //   chunkFilename: "static/css/[id].css",
    // }),
  ];
  // if (env?.ANALYZE) plugins.push(new BundleAnalyzerPlugin());
  return {
    entry: "./src/index.ts",
    module: {
      rules: [
        // {
        //   test: /\.(png|jpe?g|gif)$/i,
        //   type: "asset/resource",
        // },
        // {
        //   test: /\.svg$/i,
        //   type: "asset",
        //   resourceQuery: /url/, // *.svg?url
        // },
        // {
        //   test: /\.svg$/i,
        //   issuer: /\.[jt]sx?$/,
        //   resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        //   use: ["@svgr/webpack"],
        // },
        {
          test: /.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".*", ".js", ".jsx", ".tsx", ".ts"],
          },
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },

        // {
        //   test: /\.css$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: "css-loader",
        //       options: {
        //         importLoaders: 3,
        //         modules: true,
        //         esModule: true,
        //         modules: {
        //           localIdentName: "[name]-[local]-[hash:base64:3]",
        //         },
        //       },
        //     },
        //     "postcss-loader",
        //   ],
        //   include: /\.module\.css$/,
        // },
        // {
        //   test: /\.css$/,
        //   use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        //   exclude: /\.module\.css$/,
        // },
      ],
    },
    plugins: plugins,
  };
};
