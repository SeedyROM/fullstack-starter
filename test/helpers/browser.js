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

//
// PROBLEM: Clientside tests never exit regardless of the mocha configuration.
// TEMP PATCH: Kill the process at the end of the testsuite.
//
// TODO: Find the fix for this hack!
after(() => {
    process.exit(0)
})