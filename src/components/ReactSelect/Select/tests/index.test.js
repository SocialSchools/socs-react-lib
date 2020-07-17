import React from 'react';
import { shallow } from 'enzyme';

import Select from '../index';

describe('<Select />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Select />
    );
//    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
