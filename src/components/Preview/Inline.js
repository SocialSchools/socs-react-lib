/**
 *
 * Inline Preview wrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  break-inside: avoid;
  @media screen {
    overflow-x: auto;
  }
  @media print {
    overflow-x: hidden;
  }
  white-space: nowrap;
  & > * {
    display: inline-block;
    border: 1px solid #eee;
    margin-right: 2px;
    width: 98px;
  }
  & > :last-child {
    margin-right: 0
  }
`;

function Inline(props) {
  const { children } = props;
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

Inline.propTypes = {
  children: PropTypes.node,
};

export default Inline;
