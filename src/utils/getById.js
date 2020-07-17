import { memoize } from 'lodash';

function getIdObject(list) {
  const result = {};
  list.forEach((item) => {
    result[item.id] = item;
  });
  return result;
}

const memoizedGetIdObject = memoize(getIdObject);

function getById(list, id) {
  return memoizedGetIdObject(list)[id];
}

export default getById;
