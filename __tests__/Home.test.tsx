jest.useFakeTimers('legacy')
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { Home } from '../src/Home'

describe('', () => {
  const wrapper = renderer.create(<Home/>)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})