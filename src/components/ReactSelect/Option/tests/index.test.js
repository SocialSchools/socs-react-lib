import React from 'react';
import { shallow } from 'enzyme';

import Option from '../index';

describe('<Option />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Option />
    );
//    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
