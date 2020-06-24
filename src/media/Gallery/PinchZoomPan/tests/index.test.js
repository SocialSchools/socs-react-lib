import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';

import PinchZoomPan from '../index';

describe('<PinchZoomPan />', () => {
  it('Expect to render', () => {
    const renderChildren = jest.fn();
    const renderedComponent = shallow(
      <PinchZoomPan>{renderChildren}</PinchZoomPan>
    );
    expect(renderedComponent.length).toBe(1);
    expect(renderChildren).toBeCalled();
  });
});
