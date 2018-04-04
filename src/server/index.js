const express = require('express')
const morgan = require('morgan')
const path = require('path')
const configHelper = require('./config')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')

const app = express()
const config = await configHelper.loadConfig(config_name)
const compiler = webpack(webpackConfig)

const configureServer = async (config_name) => {
    // Serve our client
    app.use(express.static(path.resolve(__dirname,  '../client/')))
    // app.use(express.static(path.resolve(__dirname,  '../../build/')))    
    app.use(morgan('tiny'))
    
    // HMR
    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
        log: console.log, 
        path: '/__webpack_hmr', 
        heartbeat: 10 * 1000
    }))
    app.use(require("webpack-hot-middleware")(compiler))

    return { app, config }
}

configureServer('development')
.then(({app, config}) => {
    app.listen(config.port, config.host, () => {
        console.log(`Listening on port ${config.port}...`)
    })
})
.catch((error) => {
    throw error
})

module.exports = app