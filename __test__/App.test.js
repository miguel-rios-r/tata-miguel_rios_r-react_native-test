import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../app/(tabs)/index';
import SingleProduct from '../app/SingleProduct';
import UpsertProduct from '../app/UpsertProduct';

describe('<HomeScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<SingleProduct />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<SingleProduct />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<SingleProduct />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<UpsertProduct />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<UpsertProduct />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<UpsertProduct />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
