/**
 *
 * ActionTrigger
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '../IconButton';
import { posAbsoluteFullCss } from '../../utils/css';

const Wrapper = styled.div`
  ${posAbsoluteFullCss};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  button {
    margin: 3px;
    width: 28px;
    min-width: 28px;
    height: 28px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
  }
`;

function ActionTrigger(props) {
  const { onRemove, onRotate } = props;
  return (
    <Wrapper>
      <IconButton icon="ss-trash" className="btn-sm" onClick={onRemove} />
      { onRotate && <IconButton icon="ss-refresh" className="btn-sm" onClick={onRotate} /> }
    </Wrapper>
  );
}

ActionTrigger.propTypes = {
  onRemove: PropTypes.func,
  onRotate: PropTypes.func,
};

export default ActionTrigger;
