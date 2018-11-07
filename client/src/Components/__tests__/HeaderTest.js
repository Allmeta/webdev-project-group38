import React from 'react';
import Header from '../Header.js';
import renderer from 'react-test-renderer';
import Provider from "react-redux/es/components/Provider";

it('renders correctly', () => {
  const tree = renderer.create(<Provider><Header /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});