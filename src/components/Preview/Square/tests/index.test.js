import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';

import Square from '../index';

describe('<Square />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Square>Hallo</Square>
    );
    expect(renderedComponent.type().name).toBe('StyledComponent');
    expect(renderedComponent.childAt(0).type().name).toBe('StyledComponent');
  });
});
