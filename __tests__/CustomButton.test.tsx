jest.useFakeTimers('legacy')
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { CustomButton } from '../src/CustomButton'

describe('', () => {
  const wrapper = renderer.create(<CustomButton/>)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})