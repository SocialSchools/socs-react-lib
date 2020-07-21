/**
 *
 * GridView Preview wrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageGrid from './ImageGrid';

const WrapOne = styled.div`
  position: relative;
  border-radius: ${(p) => p.radius};
  overflow: hidden;   // ensures max-width works in IE
  min-height: 100px;
`;

const Inline = styled(ImageGrid)`
  & > * {
    flex-basis: calc(99.99% / ${(p) => p.count});
  }
`;

function GridView(props) {
  const { count } = props;
  const radius = '8px';
  switch (count) {
    case 1:
      return <WrapOne radius={radius}>{props.children}</WrapOne>;
    case 2:
    case 3:
    case 4:
    case 5:
    default:
      return <Inline radius={radius} count={count}>{props.children}</Inline>;
  }
}

GridView.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
};

export default GridView;
