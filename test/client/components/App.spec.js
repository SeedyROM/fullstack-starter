import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import App from '../../../src/client/components/App'

require('../../helpers/async-dump')()

describe('<App/>', () => {
  it('should have an h1', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('h1')).to.have.length(1)
  })
  after(function () {
    global.asyncDump()
  })
})

