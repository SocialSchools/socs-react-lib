import tinycolor from 'tinycolor2';

function tinyFunction(name) {
  return (orgColor, amount) => {
    const color = tinycolor(orgColor);
    let result;
    switch (name) {
      case 'fadein':
        result = color.desaturate(amount);
        break;
      case 'setLightness':
        result = tinycolor({ ...color.toHsl(), l: amount });
        break;
      case 'setHsl':
        result = tinycolor({ ...color.toHsl(), ...amount });
        break;
      default:
        result = color[name](amount);
    }
    return result.toHexString();
  };
}

export default tinyFunction;

export function limitLuminosity(hex) {
  const hsl = tinycolor(hex).toHsl();
  const limit = 0.75;
  if (hsl.l < limit) {
    return hex;
  }
  hsl.l = limit;
  return tinycolor(hsl).toHexString();
}
