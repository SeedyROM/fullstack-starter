const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../../src/server')

describe('Client entry rendering', () => {
    it('should render index.html', async function() {
        const resp = await chai
            .request(app)
            .get('/')
            .done()

        expect(resp.status).to.equal(200)
    })
})