const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../../src/server')

describe('Client entry rendering', () => {
    it('should render index.html', async () => {
        const resp = await chai
            .request(app)
            .get('/')

        expect(resp.status).to.equal(200)
    })
})