import React from 'react'
import { shallow } from 'enzyme'
import { LP, OptionWrapper } from '../LandingPage'

let wrapped

beforeEach(() => {
  wrapped = shallow(<LP />)
})

describe('Landing Page', () => {
  it('contains 2 Links', () => {
    expect(wrapped.find(OptionWrapper).length).toEqual(2)
  })
})
