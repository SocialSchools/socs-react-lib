import { useState } from 'react';
import Cookie from 'js-cookie';

function useCookie(key, initialValue, options = { expires: 365 }) {
  const [item, setItem] = useState(() => Cookie.get(key) || initialValue);

  const updateItem = (value) => {
    setItem(value);
    Cookie.set(key, value, options);
  };

  return [item, updateItem];
}

export default useCookie;
