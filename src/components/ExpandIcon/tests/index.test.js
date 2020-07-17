import React from 'react';
import { shallow } from 'enzyme';

import ExpandButton from '../index';

describe('<ExpandButton />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <ExpandButton />
    );
    //    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
