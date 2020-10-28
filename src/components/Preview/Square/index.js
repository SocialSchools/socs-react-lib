/**
*
* Square
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Outer = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-bottom: ${(p) => p.aspect};
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
  const { aspect, ...rest } = props;
  return (
    <Outer aspect={aspect}>
      <Inner {...rest} />
    </Outer>
  );
}

Square.propTypes = {
  aspect: PropTypes.string,
};

Square.defaultProps = {
  aspect: '100%',
};

export default Square;
