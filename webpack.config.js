const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

module.exports = (env, argv) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(`${envPath}.local`)
    ? `${envPath}.local`
    : fs.existsSync(envPath)
    ? envPath
    : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed;

  // create a nice object from the env variable
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    mode: 'development',
    optimization: {
      minimize: false,
      minimizer: argv.mode === 'production' ? [new UglifyJsPlugin(...customConfig)] : [],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            process.env.env !== 'prod' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              ident: 'postcss',
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      hotOnly: true,
      compress: true,
      open: true,
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
    },
  };
};
