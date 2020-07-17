/**
 *
 * Trigger
 * convert div to functional button
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Trigger = styled.div.attrs({ role: 'button' })`
  tab-index: 0;
  cursor: pointer;
  text-align: center;
`;

export default Trigger;
