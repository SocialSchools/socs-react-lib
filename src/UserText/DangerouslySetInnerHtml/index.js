/**
*
* DangerouslySetInnerHtml
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function DangerouslySetInnerHtml(props) {
  const { children, component: Component, ...rest } = props;
  const innerHtml = { __html: children };
  const newProps = {
    ...rest,
    dangerouslySetInnerHTML: innerHtml,
  };
  if (Component) {
    return <Component {...newProps} />; // eslint-disable-line react/no-danger
  }
  return <span {...newProps} />; // eslint-disable-line react/no-danger
}

DangerouslySetInnerHtml.propTypes = {
  children: PropTypes.node,
  component: PropTypes.any,
};

export default DangerouslySetInnerHtml;
