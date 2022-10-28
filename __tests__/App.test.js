/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ListItem from '../src/components/listItem';
import InputItem from '../src/components/InputItem';
import * as TestRenderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';

it('renders with no change', () => {
  renderer.create(<InputItem />);
});

it('renders with no change', () => {
  renderer.create(<ListItem />);
});


it('if we pass a value to the input, our placeholder should be empty', () => {
  const tree = renderer.create(<InputItem value={'test'}   />).toJSON();
  expect((tree?.children)[0]?.props.placeholder).toBe('')
});

it('if index more than 0, borderradius ahould be 0', () => {
  const list = renderer.create(<ListItem index={1}   />).toJSON();
  expect((list.props.style)[1]?.borderTopRightRadius).toBe(0)
});



