/**
*
* ImageGrid
*
*/

// import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageGrid = styled.div`
  position: relative;
  margin-right: -${(p) => p.gap};
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex: 0 0 50%;
    & > * {
      margin-right: ${(p) => p.gap};
      margin-bottom: ${(p) => p.gap};
      border-radius: ${(p) => p.radius};
      overflow: hidden;
    }
  }
`;

ImageGrid.propTypes = {
  gap: PropTypes.string,
  radius: PropTypes.string,
};

ImageGrid.defaultProps = {
  gap: '8px',
  radius: '16px',
};

export default ImageGrid;
