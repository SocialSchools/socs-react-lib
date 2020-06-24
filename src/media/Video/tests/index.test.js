import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import 'jest-styled-components';

import Video from '../index';

const video = {
  mp4: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
};

describe('<Video />', () => {
  it('Expect to render', () => {
    const renderedComponent = shallow(
      <Video video={video} />
    );
    expect(renderedComponent.length).toBe(1);
  });
});
