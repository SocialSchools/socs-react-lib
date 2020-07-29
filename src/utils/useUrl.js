/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * urlUtils
 *
 */

import { useLocation, useHistory } from 'react-router-dom';

const PREFIXES = { hash: '#', search: '?' };

export function serialize(obj) {
  if (obj === undefined || obj === null) {
    return '';
  }
  return Object.keys(obj)
    .map((k) => {
      switch (obj[k]) {
        case undefined:
        case null:
        case false:
          return false;
        case true:
          return k;
        default:
      }
      const v = encodeURIComponent(obj[k]);
      return `${k}=${v}`;
    }).filter(Boolean).join('&');
}

function parseValue(val) {
  switch (val) {
    case undefined:
    case 'true':
      return true;
    case 'null':
    case 'false':
      return false;
    default:
  }
  const numVal = Number(val);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(numVal) ? decodeURIComponent(val) : numVal;
}

export function parseString(str) {
  const result = {};
  str.replace(/^[#?]/, '').trim().split('&').forEach((item) => {
    const [key, value] = item.split('=');
    if (key) {
      result[key] = parseValue(value);
    }
  });
  return result;
}

const useLocationPart = (part) => {
  const prefix = PREFIXES[part];
  if (!prefix) {
    throw new Error(`Unknown location part ${part}`);
  }
  return () => {
    const location = useLocation();
    const history = useHistory();
    const asObject = parseString(location[part]);
    function setValue(o, v) {
      if (typeof o === 'string') {
        // Update property o
        return setValue({ ...asObject, [o]: v });
      }
      const str = serialize(o);
      const newLocation = { ...location, [part]: str ? `${prefix}${str}` : '' };
      return `${location.pathname}${newLocation.search}${newLocation.hash}`;
    }
    return {
      ...asObject,
      push: (o, v) => history.push(setValue(o, v)),
      replace: (o, v) => history.replace(setValue(o, v)),
    };
  };
};

/**
 * useHash get/set hash part of location
 *
 * @returns { obj } { hash: object,  push: func, replace: func }
 */
export const useHash = useLocationPart('hash');

/**
 * useSearch get/set hash part of location
 *
 * @returns { obj } { hash: object,  push: func, replace: func }
 */
export const useSearch = useLocationPart('search');
