import React from 'react';
import PropTypes from 'prop-types';
import EmojiConvertor from 'emoji-js';
import { stripTags } from '../../utils/strings';
import DangerouslySetInnerHtml from '../DangerouslySetInnerHtml';
import './emoji.css';

const convertor = new EmojiConvertor();
convertor.img_sets.apple.path = 'https://unpkg.com/emoji-datasource-apple@4.0.2/img/apple/64/';

function replace(obj) {
  if (typeof obj === 'string') {
    const noTags = stripTags(obj);
    return <DangerouslySetInnerHtml>{convertor.replace_unified(noTags)}</DangerouslySetInnerHtml>;
  }
  if (Array.isArray(obj)) {
    return obj.map((item, idx) => ({ ...replace(item), key: item.key || idx + 1 }));
  }
  return obj;
}

function Emoji(props) {
  const { children } = props;
  return replace(children);
}

Emoji.propTypes = {
  children: PropTypes.any,
};

export default Emoji;
