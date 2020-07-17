/**
 *
 * Option
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
// import styled from 'styled-components';

function Option(props) {
  const { label, ...rest } = props;
  const intl = useIntl();
  const className = rest.value ? undefined : 'placeholder';
  const message = label.id ? intl.formatMessage(label, label.values) : label;
  return <option {...rest} className={className}>{message}</option>;
}

Option.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  value: PropTypes.any,
};

export default Option;
