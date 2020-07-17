/**
 *
 * WrapAround Preview wrapper
 *
 */

import styled from 'styled-components';

// const padding = '10px';
const WrapAround = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  & > * {
    border: 1px solid #eee;
  }
`;

export default WrapAround;
