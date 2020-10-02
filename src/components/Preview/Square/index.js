/**
*
* Square
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Outer = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

function Square(props) {
  return (
    <Outer>
      <Inner {...props} />
    </Outer>
  );
}

export default Square;
