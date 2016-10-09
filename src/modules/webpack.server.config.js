/* eslint import/no-extraneous-dependencies: 0 */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { DEV_PORT, DEV_HOST, PUBLIC_PATH } from './Constants'

const PROD = process.env.NODE_ENV === 'production'

function getPublicPath() {
  return PROD ? PUBLIC_PATH : `http://${DEV_HOST}:${DEV_PORT}/`
}

const config = {

  target: 'node',

  devtool: 'source-map',

  entry: {
    server: './src/api/server.js'
  },

  output: {
    path: './.build',
    filename: '[name].js',
    publicPath: getPublicPath()
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json/, loader: 'json' },
      { test: /\.md/, loader: 'raw' },
      {
        test: /\.(css|scss)$/,
        loader: !PROD
          ? ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap') // eslint-disable-line
          : ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap-autoprefixer!postcss!sass')
      },
      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // A special case for favicon.ico to place it into build root directory.
      {
        test: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'favicon.ico?[hash:8]'
        }
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]
}

if (PROD) {
  const prodPlugins = [
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]

  config.plugins = [...config.plugins, ...prodPlugins]
}


export default config
