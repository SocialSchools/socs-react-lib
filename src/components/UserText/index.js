/**
 *
 * UserText
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import showdown from 'showdown';
import createDOMPurify from 'dompurify';
import { coverImageCss, posAbsoluteFullCss } from '../../utils/css';
import videoIcon from './images/playvideo2.svg';
import youtubeLogo from './images/logos/youtube.svg';
import vimeoLogo from './images/logos/vimeo.svg';
import { encodeHtmlEntities } from '../../utils/strings';
import useCookie from '../../utils/useCookie';
import embedVideo, { STATUS_EMBED, STATUS_BUTTON, STATUS_LINK } from '../../utils/embedVideo';
import Emojify from './Emojify';
// eslint-disable-next-line import/no-named-as-default
import DangerouslySetInnerHtml from './DangerouslySetInnerHtml';
import PermissionModal from './PermissionModal';

const DOMPurify = createDOMPurify(window);

const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  simpleLineBreaks: true,
  excludeTrailingPunctuationFromURLs: true,
  encodeEmails: false,
});

const bgPad = '3px';

const Wrapper = styled.span`
  color: #555;
  overflow-wrap: anywhere;
  p {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
  h1, h2, h2, h4, h5, h6 {
    margin: 0 0 10px;
    line-height: 1.5;
  }
  h1 {
    font-size: 1.3em;
  }
  h2 {
    font-size: 1.2em;
  }
  h2 {
    font-size: 1.1em;
  }
  h4 {
    font-size: 1.0em;
  }
  h5 {
    font-size: 0.9em;
  }
  h6 {
    font-size: 0.8em;
  }
  & > span > p:last-child {
    margin-bottom: 0;
  }
  div.embed-video {
    overflow: hidden;
    height: 0;
    padding-top: 56.25%;
    position: relative;
    & > * {
      ${posAbsoluteFullCss};
      border: none;
      padding: 0;
    }
    img.video-preview {
      ${coverImageCss};
    }
    div.video-overlay {
      ${posAbsoluteFullCss};
      &.video-youtube {
        background: url(${youtubeLogo}) right ${bgPad} bottom ${bgPad} no-repeat,  url(${videoIcon}) center no-repeat;
      }
      &.video-vimeo {
        background: url(${vimeoLogo}) right ${bgPad} bottom ${bgPad} no-repeat,  url(${videoIcon}) center no-repeat;
      }
    }
    iframe {
      background: #eee;
      border: none;
    }
  }
`;

function UserText(props) {
  const { children, inline, className } = props;
  const text = encodeHtmlEntities(children);
  const [permission, setPermission] = useCookie('videoOption', STATUS_BUTTON);
  const initialStatus = window.location.protocol.startsWith('http') ? permission : STATUS_EMBED;
  const [videoStatus, setVideoStatus] = useState(initialStatus);
  const [videoLink, setVideoLink] = useState(false);
  const html = converter.makeHtml(text);
  const userlinks = html.replace(/<a /g, '<a rel="ugc" ');
  const askPermission = (ev) => {
    // Only div.video-overlay on status=STATUS_BUTTON has data-link attribute set
    if (videoStatus === STATUS_BUTTON) {
      setVideoLink(ev.target.dataset.link);
    }
  };
  const handleHide = () => {
    setVideoLink(false);
  };
  const handleChange = (val) => {
    setVideoStatus(val);
    setPermission(val);
    if (val === STATUS_LINK) {
      window.open(videoLink);
    }
    setVideoLink(false);
  };
  try {
    const clean = DOMPurify.sanitize(userlinks);
    const withEmbed = inline ? clean : embedVideo(clean, videoStatus);
    return (
      <>
        <Wrapper className={`user-text ${className}`} inline={inline} onClick={askPermission}>
          <Emojify>
            <DangerouslySetInnerHtml>
              {withEmbed}
            </DangerouslySetInnerHtml>
          </Emojify>
        </Wrapper>
        {videoLink && <PermissionModal onHide={handleHide} onChange={handleChange} />}
      </>
    );
  } catch (err) {
    return (
      <Wrapper className={`user-text ${className}`} inline={inline}>
        <Emojify>
          {userlinks}
        </Emojify>
      </Wrapper>
    );
  }
}

UserText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  inline: PropTypes.bool,
};

export default UserText;
