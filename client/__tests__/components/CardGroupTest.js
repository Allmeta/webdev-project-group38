import React from 'react'
import CardGroup from '../../src/components/CardGroup'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import store from '../../src/store/index.js'

it('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><CardGroup></CardGroup></Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
