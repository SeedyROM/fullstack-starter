const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, './build')
const APP_DIR = path.resolve(__dirname, './src/client')

const config = {
    mode: 'development',
    entry: [
        path.join(APP_DIR, 'index.js'),
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ],
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['env', 'react'],
                            env: {
                                development: {
                                    presets: ['react-hmre'],
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = config
