const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin-next');



module.exports = {
  entry: {
    'sl-vue-tree': './src/sl-vue-tree.vue',
    'sl-vue-tree-minimal': './src/style/sl-vue-tree-minimal.scss',
    'sl-vue-tree-dark': './src/style/sl-vue-tree-dark.scss'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'SlVueTree',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  devtool: 'sourcemap',

  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  externals: {
    'Vue': 'vue'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          transformToRequire: {
            video: 'src',
            source: 'src'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|ico|wav)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'media/',
          publicPath: 'bundles/media/'
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Handles custom fonts. Currently used for icons.
      {
        test: /\.woff$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: 'bundles/fonts/'
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([
      // TODO enable ts
      {from: 'src/*.d.ts', to: '[name].ts'}
    ]),
    new WebpackShellPlugin({
      onBuildEnd:{
        scripts: [
          'rm -f ./dist/sl-vue-tree-minimal.js ./dist/sl-vue-tree-minimal.js.map',
          'rm -f ./dist/sl-vue-tree-dark.js ./dist/sl-vue-tree-dark.js.map',
        ],
        blocking: false,
        parallel: false
      }
    })
  ]
}
