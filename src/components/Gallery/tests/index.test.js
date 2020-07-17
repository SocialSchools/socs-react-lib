import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';

import Gallery from '../index';

describe('<Gallery />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Gallery items={[]} />,
    );
    expect(renderedComponent.length).toBe(1);
    //    const element = renderer.create(<Gallery />).toJSON();
    //    expect(element).toHaveStyleRule('border-radius', '50%');
  });
});
