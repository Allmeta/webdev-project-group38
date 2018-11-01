import React from 'react';
import Layout from '../Layout.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Layout />).toJSON();
    expect(tree).toMatchSnapshot();
});