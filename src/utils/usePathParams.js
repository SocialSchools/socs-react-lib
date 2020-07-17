import { useLocation, useHistory } from 'react-router-dom';

function parsePath(path) {
  const parts = path.split('/').slice(2).reverse();
  const result = {};
  let value = null;
  parts.forEach((part) => {
    if (/\D/.test(part)) {
      // Not a numeric value
      result[part] = value != null ? value : true;
      value = null;
    } else {
      value = Number(part);
    }
  });
  return result;
}

function usePathParams() {
  const { pathname } = useLocation();
  const history = useHistory();
  const params = parsePath(pathname);
  const setParams = (par) => {
    const parts = pathname.split('/', 2);
    Object.keys(par).forEach((key) => {
      const val = par[key];
      if (val && typeof val === 'number') {
        parts.push(key, val);
      } else if (val) {
        parts.push(key);
      }
    });
    history.push(parts.join('/'));
  };
  const setParam = (key, val) => {
    if (params[key] !== val) {
      setParams({ ...params, [key]: val });
    }
  };
  return { params, setParam };
}

export default usePathParams;
