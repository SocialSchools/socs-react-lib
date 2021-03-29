import { HELLIP } from './characters';
/**
 * Check for match of re in str
 * Returns whole match or first parenthised part on match
 * @param str
 * @param re
 * @returns {undefined}
 */
export function filterText(str, re) {
  const match = str.match(re);
  return match ? match[1] || match[0] : undefined;
}

/**
 * Shortens long words by replacing middle with ellipses
 * @param str
 * @param max
 * @param show   nr of character at beginning/end of word to show
 * @returns {*}
 */
export function limitLength(str, max = 128, show = 16) {
  const limitWord = (word) => (word.length > max
    ? [word.slice(0, show), word.slice(-show)].join(HELLIP)
    : word);
  return str && str.replace(/\w\S+\w/g, limitWord);
}

/**
 * Shorten string, append ellipsis if shortened
 * @param {string} str
 * @param {interger} max
 */
export function shorten(str, max = 32) {
  return str.length <= max ? str : `${str.slice(0, max).replace(/\S+$/, '')}${HELLIP}`;
}

/**
 * Remove HTML tags from string
 * @param {string} str
 */
export function stripTags(str) {
  return str.replace(/<[^>]+>/g, '');
}

/**
 * Join strings in array using ',', insert 'and/en' before last
 * @param {array} arr of strings
 * @param {string} locale
 */
export function strList(arr, locale = 'nl') {
  if (arr.length < 2) {
    return arr.toString();
  }
  const sep = (() => {
    if (locale === 'nl') {
      return ' en ';
    }
    return arr.length > 2 ? ', and ' : ' and ';
  })();
  const last = arr.slice(-2).join(sep);
  return [...arr.slice(0, -2), last].join(', ');
}

/**
 * Replace < and > by html entity
 * @param {*} text
 */
export function encodeHtmlEntities(text) {
  const entities = {
    '<': '&lt;',
    '>': '&gt;',
  };
  const re = new RegExp(`[${Object.keys(entities).join('')}]`, 'g');
  return text.replace(re, (m) => entities[m]);
}
