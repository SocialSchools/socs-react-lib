import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';

import Preview from '../index';

describe('<Preview />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Preview />
    );
    // TODO create tests
    expect(renderedComponent.length).toBe(1);
//    const element = renderer.create(<Preview />).toJSON();
//    expect(element).toHaveStyleRule('border-radius', '50%');
  });
});
