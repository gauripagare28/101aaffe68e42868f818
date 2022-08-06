jest.useFakeTimers('legacy')
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

describe('', () => {
  const wrapper = renderer.create(<App/>)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})