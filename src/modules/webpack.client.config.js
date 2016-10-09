/* eslint import/no-extraneous-dependencies: 0 */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

const PROD = process.env.NODE_ENV === 'production'

const config = {

  devtool: 'source-map',

  entry: {
    bundle: './src/app/index.js'
  },

  output: {
    path: './.build',
    filename: 'static/js/[name].[chunkhash:8].js'
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.(css|scss)$/,
        loader: !PROD
          ? 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap' // eslint-disable-line
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
      },
      // "html" loader is used to process template page (index.html) to resolve
      // resources linked with <link href="./relative/path"> HTML tags.
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          attrs: ['link:href']
        }
      },
      { test: /\.md/, loader: 'raw' }
    ]
  },

  // We use PostCSS for autoprefixing only.
  postcss: () =>
    [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9' // React doesn't support IE8 anyway
        ]
      })
    ],

  plugins: [
    // Generates an `index.html` file with the <script> injected.
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: './src/template/index.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
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
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]

  config.plugins = [...config.plugins, ...prodPlugins]
}

export default config
