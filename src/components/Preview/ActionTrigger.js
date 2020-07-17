/**
 *
 * ActionTrigger
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { posAbsoluteFullCss } from '../../utils/css';

const Wrapper = styled.div`
  ${posAbsoluteFullCss};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  button {
    margin: 3px;
  }

`;

function ActionTrigger(props) {
  const { onRemove, onRotate } = props;
  return (
    <Wrapper>
      <Button icon="ss-trash" bsSize="small" onClick={onRemove} />
      { onRotate && <Button icon="ss-refresh" bsSize="small" onClick={onRotate} /> }
    </Wrapper>
  );
}

ActionTrigger.propTypes = {
  onRemove: PropTypes.func,
  onRotate: PropTypes.func,
};

export default ActionTrigger;
