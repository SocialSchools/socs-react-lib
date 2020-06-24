/**
 *
 * UserText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import showdown from 'showdown';
import createDOMPurify from 'dompurify';
import { encodeHtmlEntities } from '../utils/strings';
import Emojify from './Emojify';
import DangerouslySetInnerHtml from './DangerouslySetInnerHtml';

const DOMPurify = createDOMPurify(window);

const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  simpleLineBreaks: true,
  excludeTrailingPunctuationFromURLs: true,
  encodeEmails: false,
});

const Wrapper = styled.span`
  color: ${(p) => p.theme.gray};
  overflow-wrap: break-word;
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
  a:after {
    content: "\f08e";
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0.7;
    margin-left: 2px;
    font-size: 0.75em;
    height: 1em;
    line-height: 1.5em;
    vertical-align: top;
  }
`;

function UserText({ children, inline }) {
  const text = encodeHtmlEntities(children);
  const html = converter.makeHtml(text);
  const userlinks = html.replace(/<a /g, '<a rel="ugc" target="_blank" ');
  const clean = DOMPurify.sanitize(userlinks);
  return (
    <Wrapper className="user-text" inline={inline}>
      <Emojify>
        <DangerouslySetInnerHtml>
          {clean}
        </DangerouslySetInnerHtml>
      </Emojify>
    </Wrapper>
  );
}

UserText.propTypes = {
  children: PropTypes.string,
  inline: PropTypes.bool,
};

export default UserText;
