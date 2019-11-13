/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from '../App';

describe('AUTOCOMPLETE: autocomplete cities', () => {
  it('Should Match the Snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should Render Autcomplete', () => {
    const wrapper = shallow(<App />);
    const title = wrapper.find('h1');
    expect(title.length).toEqual(1);
  });
});
