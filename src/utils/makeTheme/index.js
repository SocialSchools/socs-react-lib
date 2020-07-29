import { camelCase } from 'lodash';
import tinycolor from 'tinycolor2';
import tinyFunction from './tinyFunction';
import { vars } from './config.json'; // From bootstrap 3 config utility
import { themeVariables } from './constants';
import themeFromSchool from './themeFromSchool';

/* eslint-disable no-unused-vars */
const rgba = (r, g, b, a) => tinycolor(r, g, b, a).toHexString();
const lighten = tinyFunction('lighten');
const darken = tinyFunction('darken');
const setLightness = tinyFunction('setLightness');
const setHsl = tinyFunction('setHsl');
const spin = tinyFunction('spin');
const fadein = tinyFunction('fadein');
const { ceil, floor } = Math;
/* eslint-enable no-unused-vars */

function camelKey(key) {
  return camelCase(key.substr(1));
}

// Change keys of vars to camelCase
const camelVars = Object.keys(vars)
  .reduce((result, key) => ({ ...result, [camelKey(key)]: vars[key] }), {});

/**
 * Parse less string to valid CSS
 * @param key
 * @param obj
 * @returns {*}
 */
function parse(key, obj) {
  /**
   * Recursively substitute variables for values until all replaced
   * @param str
   * @returns {*}
   */
  function substitute(str) {
    const result = str.replace(/@[\w-]+/g, (k) => obj[camelKey(k)]);
    return result === str ? result : substitute(result);
  }

  const str = obj[key] || '';
  // Substitute current variables
  const substituted = substitute(str);
  // css knows how to handle rgba function, remove bracket for testing
  const cssKnows = substituted.replace(/rgba\(/g, 'rgba');
  if (!cssKnows.includes('(') && !cssKnows.includes(' / ')) {
    // No evaluation needed
    return substituted;
  }
  if (/px/.test(substituted)) {
    // Dimensions, just evaluate and add px back later
    const evaluated = eval(substituted.replace(/px/g, '')); // eslint-disable-line no-eval
    return `${evaluated}px`;
  }
  const colorRe = /(#([\da-f]+))/gi;
  if (colorRe.test(substituted) || /rgba/.test(substituted)) {
    const forEval = substituted
      .replace(/(#([\da-f]+))/gi, '\'$1\'') // Color string in quotes
      .replace(/%/g, ''); // Remove %, such values are on a scale 0-100 anyway
    return eval(forEval).replace(/'/g, ''); // eslint-disable-line no-eval
  }
  try {
    return eval(substituted); // eslint-disable-line no-eval
  } catch (e) {
    return substituted; // In case of error evaluating, return original
  }
}

export function mergeTheme(theme) {
  const merged = { ...camelVars, ...themeVariables, ...theme };
  return Object.keys(merged)
    .reduce((result, key) => ({ ...result, [key]: parse(key, merged) }), {});
}

export function mergeConfig(school) {
  const theme = themeFromSchool(school);
  return mergeTheme(theme);
}
