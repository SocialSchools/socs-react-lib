/* eslint-disable no-bitwise */
/**
 *
 * UserText
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { marked } from 'marked';
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
import { mergeClassList } from '../../utils';

const DOMPurify = createDOMPurify(window);
marked.setOptions({ breaks: true });

const bgPad = '3px';

export const userTextHeadersCss = css`
  h1, h2, h2, h4, h5, h6 {
    margin: 0 0 10px;
    line-height: 1.5;
    font-weight: 500;
  }
  h1 {
    font-size: 1.4em;
  }
  h2 {
    font-size: 1.2em;
  }
  h3 {
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
`;

const Wrapper = styled.span`
  color: ${(p) => (p.inline ? 'inherit' : '#555')};
  overflow-wrap: anywhere;
  p {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
  ${userTextHeadersCss};
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

/**
 * Replace text only outside tags
 * @param {*} text
 * @param {*} markText
 * @returns
 */
function replaceText(text, markText) {
  const re = new RegExp(markText, 'gi');
  const replace = (str) => str.replace(re, `<mark>${markText}</mark>`);
  const parts = text.split(/[<>]/).map((token, idx) => ((idx & 1) ? `${token}>` : `${replace(token)}<`));
  return (parts.length & 1) ? parts.join('').slice(0, -1) : parts.join('');
}

function UserText(props) {
  const {
    children, inline, className, markText,
  } = props;
  if (!children) {
    return null;
  }
  const [permission, setPermission] = useCookie('videoOption', STATUS_BUTTON);
  const initialStatus = window.location.protocol.startsWith('http') ? permission : STATUS_EMBED;
  const [videoStatus, setVideoStatus] = useState(initialStatus);
  const [videoLink, setVideoLink] = useState(false);
  const converter = inline ? marked.parseInline : marked;
  let html = converter(encodeHtmlEntities(children));
  html = html.replace(/<a /g, '<a rel="ugc" ');
  if (html && markText) {
    html = replaceText(html, markText);
  }
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
  const fullClassList = mergeClassList(['user-text', className]);
  try {
    const clean = DOMPurify.sanitize(html);
    const withEmbed = inline ? clean : embedVideo(clean, videoStatus);
    return (
      <>
        <Wrapper className={fullClassList} inline={inline} onClick={askPermission}>
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
      <Wrapper className={fullClassList} inline={inline}>
        <Emojify>
          {html}
        </Emojify>
      </Wrapper>
    );
  }
}

UserText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  inline: PropTypes.bool,
  markText: PropTypes.string,
};

export default UserText;
