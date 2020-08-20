/**
 * Img: reloading image if not found
 */

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Button } from 'react-bootstrap';
import { omit } from 'lodash';
import spinner2 from './spinner2.svg';
import reload from './reload.svg';

const rotate360 = keyframes`
  from { 
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotImg = styled.img`
  border: transparent !important;
  background-color: transparent;
  animation: ${rotate360} ${(p) => (p.delay / 1000)}s linear infinite;
  padding: 10px;
  && {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const STAGE_TRYING = Symbol('trying to load');
const STAGE_SPIN = Symbol('waiting for auto-retry');
const STAGE_FAIL = Symbol('failed, reload on click');

function Img(props) {
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(STAGE_TRYING);
  const timeoutId = useRef(null);
  const cancelTimeout = () => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }
  };
  useEffect(() => cancelTimeout, []);
  const altProps = omit(props, ['bsSize', 'group']);
  const { delay, retry, src, ...rest } = altProps;
  if (retry === 0) {
    return <img {...altProps} />;
  }
  function handleError() {
    if (count >= retry) {
      setStage(STAGE_FAIL);
      return;
    }
    setStage(STAGE_SPIN);
    timeoutId.current = window.setTimeout(() => {
      setStage(STAGE_TRYING);
      timeoutId.current = null;
      setCount(count + 1);
    }, delay);
  }
  function forceRetry() {
    setCount(0);
    setStage(STAGE_TRYING);
  }
  switch (stage) {
    case STAGE_TRYING:
      return <img {...rest} src={src} onError={handleError} />;
    case STAGE_SPIN:
      return <RotImg {...rest} src={spinner2} delay={delay} onError={handleError} />;
    case STAGE_FAIL:
      return <Button bsStyle="link" onClick={forceRetry}><img {...rest} src={reload} /></Button>;
    default:
  }
}

Img.propTypes = {
  src: PropTypes.string,
  delay: PropTypes.number,
  retry: PropTypes.number,
};

Img.defaultProps = {
  delay: 3000,
  retry: 100,
};

export default Img;
