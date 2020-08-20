/**
 *
 * Preview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Square from './Square';
import Gallery from '../Gallery';

import { docType, rotateFile } from '../../utils/files';
import { centerCss } from '../../utils/css';
import LocaleProvider from '../LocaleProvider';
import ImagePreview from './ImagePreview';
import GridView from './GridView';
import Inline from './Inline';
import ActionTrigger from './ActionTrigger';
import parseFiles from './parseFiles';
import messages from './messages';
import ListDocuments from './ListDocuments';
import PrimaryProgressBar from './PrimaryProgressBar';

const MEDIAFILE_STATUS_QUEUED = 20;

const FullWidth = styled.div`
  & > div > div {
    flex: 0 0 100%;   // Fix for IE 11
    min-height: 100px;
    ${centerCss}
  }
`;

const Wrapper = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

const PreviewWrapper = styled.div`
  ${centerCss};
  background: #eee;
`;

const SmallWrapper = styled.div`
  display: inline-block;
`;

const ImageProgressBar = styled(PrimaryProgressBar)`
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
`;

class Preview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: -1, // 0 or higher to open gallery
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  handleRemove(item) {
    const { onChange } = this.props;
    return () => onChange({ ...item, file: undefined });
  }

  handleRotate(item) {
    if (!item.file || !item.file.canRotate) {
      return undefined;
    }
    const { onChange } = this.props;
    if (docType(item.file.type) !== 'image') {
      return undefined;
    }
    return () => rotateFile(item.file)
      .then((rotated) => {
        onChange({ ...item, file: rotated });
      });
  }

  openLightbox(index) {
    return () => {
      this.setState({
        startIndex: index,
      });
    };
  }

  closeLightbox() {
    this.setState({
      startIndex: -1,
    });
  }

  renderImage(forceSquare, options) {
    return (file, idx) => {
      const {
        onChange, inline, small, gallery,
      } = this.props;
      const { startIndex } = this.state;
      const Shaper = forceSquare ? Square : FullWidth;
      const ImageWrapper = small ? SmallWrapper : PreviewWrapper;
      const overlay = !inline && options.maxCount
        && options.count > options.maxCount && idx === options.maxCount - 1
        ? `+ ${options.count - options.maxCount}` : '';
      return (
        <Shaper key={file.id}>
          <ImageWrapper>
            <ImagePreview
              file={file}
              fullview={!forceSquare}
              disabled={startIndex >= 0}
              overlay={overlay}
              editing={onChange !== undefined}
              onClick={gallery && this.openLightbox(idx)}
            />
          </ImageWrapper>
          {onChange
            && (
              <ActionTrigger
                onRemove={this.handleRemove(file)}
                onRotate={this.handleRotate(file)}
              />
            )}
          {file.loading && <ImageProgressBar now={file.progress} label={`${file.progress}%`} />}
        </Shaper>
      );
    };
  }

  render() {
    const {
      files, inline, small, gallery, className, onChange,
    } = this.props;
    const { startIndex } = this.state;
    if (!files || files.length === 0) {
      return null;
    }
    const parsedFiles = parseFiles(files);
    parsedFiles.media = [...parsedFiles.videos, ...parsedFiles.images];
    const MediaWrapper = inline ? Inline : GridView;
    const count = parsedFiles.media.length;
    const forceSquare = inline || small || (count > 1);
    const maxCount = 4;
    const media = inline ? parsedFiles.media : parsedFiles.media.slice(0, maxCount);
    const videoWarn = !inline && media.some((m) => m.type === 'video' && m.status === MEDIAFILE_STATUS_QUEUED);
    return (
      <LocaleProvider>
        <Wrapper inline={inline} className={className}>
          <MediaWrapper count={small ? maxCount : Math.min(maxCount, count)} className="media-wrapper">
            {media.map(this.renderImage(forceSquare, { maxCount, count }))}
          </MediaWrapper>
          {videoWarn && <Alert bsStyle="warning"><FormattedMessage {...messages.slowVideos} /></Alert>}
          {<Alert bsStyle="warning"><FormattedMessage {...messages.slowVideos} /></Alert>}
          <ListDocuments files={parsedFiles.other} onRemove={onChange && this.handleRemove} />
          {gallery && startIndex >= 0
            && (
              <Gallery
                items={parsedFiles.media}
                startIndex={startIndex}
                onClose={this.closeLightbox}
              />
            )}
        </Wrapper>
      </LocaleProvider>
    );
  }
}

Preview.propTypes = {
  inline: PropTypes.bool,
  className: PropTypes.string,
  small: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func,
  gallery: PropTypes.bool,
};

export default Preview;
