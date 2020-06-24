/**
 *
 * Asynchronously loads the component for Emoji
 *
 */

// import React from 'react';
// import styled from 'styled-components';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Emoji'),
  loading: () => null,
});
