import React from 'react'
import Card from '../src/Components/Card.js'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import store from '../src/store/index.js'

it('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Card title="snapshot" popularity={123} genres={['snapshot genre']} /></Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
