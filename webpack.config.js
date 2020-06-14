var webpack = require("webpack")
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require("path")

// process.noDeprecation = true

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist/assets"),
        filename: "bundle.js",
        publicPath: "",
        sourceMapFilename: "bundle.map"
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: "/images"
                      },
                    },
                ],
            },
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
}
