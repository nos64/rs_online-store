const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslingPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'index.[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]'
  },
  plugins:
    [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    new EslingPlugin({ 
      extensions: 'ts' 
    }),
    ],
  module: {
    rules: [
      {
        test: /\.ts$/i, 
        use: 'ts-loader' ,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     "sass-loader",
      //   ],
      // },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(gif|png|jpeg|jpg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //       type: 'asset/resource',
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.90],
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75
      //         },
      //       }
      //     }
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};