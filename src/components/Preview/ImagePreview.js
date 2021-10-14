/**
 *
 * ImagePreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';
import { posAbsoluteFullCss, centerCss, coverImageCss } from '../../utils/css';
import { getTypeIcon } from '../../utils/files';
import Icon from '../Icon';
import Img from '../Img';

const FileIcon = styled(Icon)`
  font-size: 70px;
  color: #555;
  &.ss-play {
    color: white;
    font-size: 40px;
    transform: translate(2px, 2px);
  }
`;

const ImgWrapper = styled.div`
  ${posAbsoluteFullCss};
  ${centerCss};
  & > img {
    ${coverImageCss};
  }
`;

const IconOverlay = styled.div`
  ${posAbsoluteFullCss};
  ${centerCss};
  /* opacity: ${(props) => (props.processing ? 0.5 : 1)};
  background-color: ${(props) => (props.processing ? 'white' : 'transparent')}; */
  & > div {
    background: rgba(0,0,0,0.5);
    width: 48px;
    text-align: center;
    border-radius: 20px;
  }
`;

const TextOverlay = styled(IconOverlay)`
  .badge {
    background: rgba(0,0,0,0.5);
    padding: 5px 10px;
    font-size: 21px;
    font-weight: normal;
    height: 32px;
    border-radius: 16px;
  }
`;

const FileName = styled.div`
  position: absolute;
  left: 0;
  bottom: 3px;
  right: 0;
  background-color: #fff;
  color: #000;
  opacity: 0.7;
  font-size: 80%;
  padding: 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function ImagePreview(props) {
  const {
    file, fullview, overlay, noRetry, onClick, disabled,
  } = props;

  function renderPreview() {
    if (file.preview === undefined) {
      return (
        <div className="pt-3">
          <FileIcon className={getTypeIcon(file)} />
          <FileName title={file.fileName}>{file.fileName}</FileName>
        </div>
      );
    }
    const retry = noRetry ? 0 : undefined;
    return fullview
      ? <Img src={file.fullview} alt={file.fileName} retry={retry} />
      : (
        <ImgWrapper>
          <Img src={file.preview} alt={file.fileName} retry={retry} />
          {overlay && <TextOverlay><Badge>{overlay}</Badge></TextOverlay>}
        </ImgWrapper>
      );
  }

  function renderWithIcon() {
    return (
      <>
        {renderPreview()}
        {file.preview && file.type === 'video' && (
          <IconOverlay>
            <div>
              <FileIcon className="ss-play" />
            </div>
          </IconOverlay>
        )}
      </>
    );
  }

  if (!onClick || disabled) {
    return renderWithIcon();
  }
  return (
    <button type="button" onClick={onClick}>
      {renderWithIcon()}
    </button>
  );
}

ImagePreview.propTypes = {
  file: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullview: PropTypes.bool,
  noRetry: PropTypes.bool,
  overlay: PropTypes.string,
};

export default ImagePreview;
