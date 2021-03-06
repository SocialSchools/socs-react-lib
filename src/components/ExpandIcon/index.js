/**
*
* ExpandIcon
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: inline-block;
  i {
    font-size: 24px;
    transition: transform 0.2s;
    transform: rotate(${(p) => p.rotate}deg)
  }
`;

function ExpandIcon(props) {
  const { expanded, ...rest } = props;
  return (
    <Wrapper rotate={expanded ? 90 : 0} {...rest}>
      <Icon className="ss-directionright expand-icon" />
    </Wrapper>
  );
}

ExpandIcon.propTypes = {
  expanded: PropTypes.bool,
};

export default ExpandIcon;
