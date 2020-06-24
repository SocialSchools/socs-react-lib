import React from 'react';
import { shallow } from 'enzyme';

import DangerouslySetInnerHtml from '../index';

describe('<DangerouslySetInnerHtml />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <DangerouslySetInnerHtml />
    );
//    const element = renderedComponent.getElement();
    expect(renderedComponent.length).toBe(1);
  });
});
