/**
 *
 * Asynchronously loads the component for Emojify
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import detectMobile from '../../utils/detectMobile.lib';
import Emoji from './Loadable';

function Emojify(props) {
  const { children } = props;
  if (detectMobile()) {
    return children;
  }
  return <Emoji>{children}</Emoji>;
}

Emojify.propTypes = {
  children: PropTypes.node,
};

export default Emojify;
