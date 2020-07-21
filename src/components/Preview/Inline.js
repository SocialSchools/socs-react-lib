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
  @media screen {
    max-width: 488px;       // Wide screen
    overflow-x: auto;
    @media (max-width: 1178px) and (min-width: 992px) {
      /* Medium screen, with sidebar, too small for full width */
      max-width: calc(((100vw - 290px) * 7 / 12) - 30px);
    }
    @media (max-width: 938px) {
      /* Small screen without sidebar, too small for full width */
      max-width: calc(((100vw - 50px) * 7 / 12) - 30px);
    }
    @media (max-width: 767px) {
      /* Xs screen, no widgets */
      max-width: calc(100vw - 30px);
    }
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
