const fs = require('fs')
const path = require('path')
const glob = require('glob')

const CONFIG_DIR = path.resolve(__dirname)

const asyncGlob = (pattern, options = {}) => {
    return new Promise((res, rej) => {
        glob(pattern, options, (error, files) => {
            if(error) rej(error)
            else res(files)
        })
    })
}

const getConfigs = async () => {
    return await asyncGlob(`${CONFIG_DIR}/*.json`)
}

const loadConfig = async (name) => {
    const configs = await getConfigs()
    let loadedConfig = null

    configs.forEach((config_path) => {
        if (path.basename(config_path) == `${name}.json`) {
            try {
                loadedConfig = JSON.parse(fs.readFileSync(config_path))
            } catch(error) {
                throw new Error(`Config "${name}" not found`)
            }
        }
    })

    return loadedConfig
}

module.exports = {
    loadConfig
}