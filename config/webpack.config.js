const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');

const rootDir = __dirname + "/.."

const isProduction = process.env.NODE_ENV == "production" || false
const hash = isProduction ? ".[contenthash]" : "";

module.exports = {
    devServer: {
        port: 8091,
        contentBase: './dist',
        https: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:8090'
        }
    },
    entry:  {
        index: path.resolve(rootDir, 'src/index.tsx'),
    },
    mode: isProduction? "production" : 'development',
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: `react/[name]${hash}.js`,
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'src/index.html'),
            filename: path.resolve(rootDir, 'dist/index.html'),
            inject: true,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `react/[name]${hash}.css`,
            chunkFilename: `react/[id]${hash}.css`,
        }),
    ],
    resolve: {
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(rootDir, "config/tsconfig.build.json")
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  // 'style-loader',
                  // To extract in separated files
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        sideEffects: true
    },
    devtool: "source-map"
}