/**
 *
 * Option
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Option(props) {
  const { label, ...rest } = props;
  const className = rest.value ? undefined : 'placeholder';
  return <option {...rest} className={className}>{label}</option>;
}

Option.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  value: PropTypes.any,
};

export default Option;
