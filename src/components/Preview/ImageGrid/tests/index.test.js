import React from 'react';
import { shallow } from 'enzyme';

import ImageGrid from '../index';

describe('<ImageGrid />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <ImageGrid />
    );
//    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
