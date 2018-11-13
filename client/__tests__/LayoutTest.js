import React from 'react'
import Layout from '../src/Components/Layout.js'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import store from '../src/store/index.js'

it('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Layout /></Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
