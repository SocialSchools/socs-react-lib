import React from 'react';
import { shallow } from 'enzyme';

import UserText from '../index';

describe('<UserText />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <UserText />,
    );
    //    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
