/**
 *
 * IconButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Icon from './Icon';

const RoundButton = styled(Button)`
  width: 28px;
  min-width: 28px;
  height: 28px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
  i {
    font-size: 150%;
  }
`;

function IconButton(props) {
  const { icon, ...rest } = props;
  return (
    <RoundButton {...rest}>
      <Icon className={icon} />
    </RoundButton>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default IconButton;
