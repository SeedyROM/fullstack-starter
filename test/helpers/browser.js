const { JSDOM } = require('jsdom')

const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })

const exposedProperties = ['window', 'navigator', 'document']
const { document } = (new JSDOM('')).window

global.document = document

global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
    }
})

global.navigator = {
    userAgent: 'node.js'
}
