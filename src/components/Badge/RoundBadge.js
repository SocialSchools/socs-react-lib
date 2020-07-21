/**
*
* RoundBadge
*
*/

// import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Badge from './index';

const RoundBadge = styled(Badge)`
  &.badge {
    width: 24px;
    height: 24px;
    font-size: 16px;
    font-weight: normal;
    padding: 4px;
    text-align: center;
    border-radius: 50%;
  }
  &.badge-initial {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    text-transform: uppercase;
  }
`;

export default RoundBadge;
