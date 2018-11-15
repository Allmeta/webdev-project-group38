import React from 'react'
import SearchForm from '../../src/components/SearchForm.js'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import store from '../../src/store/index.js'
import { Provider } from 'react-redux'

it('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><SearchForm /></Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
