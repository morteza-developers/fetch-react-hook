const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css",
    }),
  ];
  if (env?.ANALYZE) plugins.push(new BundleAnalyzerPlugin());
  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/i,
          type: "asset",
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ["@svgr/webpack"],
        },
        {
          test: /.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".*", ".js", ".jsx", ".tsx", ".ts"],
            alias: {
              components: path.resolve(
                __dirname,
                "src/presentation/components/"
              ),
              utils: path.resolve(__dirname, "src/presentation/utils/"),
              pages: path.resolve(__dirname, "src/presentation/pages/"),
              lang: path.resolve(__dirname, "src/presentation/lang/"),
              redux: path.resolve(__dirname, "src/presentation/redux/"),
              hooks: path.resolve(__dirname, "src/presentation/hooks/"),
              lib: path.resolve(__dirname, "src/presentation/lib/"),
              packages: path.resolve(__dirname, "src/presentation/packages/"),
              constants: path.resolve(__dirname, "src/presentation/constants/"),
              providers: path.resolve(__dirname, "src/presentation/providers/"),
              types: path.resolve(__dirname, "src/presentation/types/"),
              templates: path.resolve(__dirname, "src/presentation/templates/"),
              themes: path.resolve(__dirname, "src/presentation/themes/"),
              assets: path.resolve(__dirname, "src/presentation/assets/"),
              hoc: path.resolve(__dirname, "src/presentation'hoc/"),
              features: path.resolve(__dirname, "src/features"),
              core: path.resolve(__dirname, "src/core/"),
              presentation: path.resolve(__dirname, "src/presentation/"),
              infrastructure: path.resolve(__dirname, "src/infrastructure/"),
            },
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

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 3,
                modules: true,
                esModule: true,
                modules: {
                  localIdentName: "[name]-[local]-[hash:base64:3]",
                },
              },
            },
            "postcss-loader",
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
          exclude: /\.module\.css$/,
        },
      ],
    },
    plugins: plugins,
  };
};
