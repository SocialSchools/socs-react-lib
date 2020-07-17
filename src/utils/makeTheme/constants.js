/*
 *
 * ThemeProvider constants
 *
 */

export const SET_THEME = 'app/ThemeProvider/SET_THEME';

export const themeVariables = {
  transitionDuration: '0.2s',
  contentBg: 'setLightness(fadein(@brand-primary, 10), 92%)',
  bannerBackground:
   'https://s3-eu-west-1.amazonaws.com/assets.socialschools.nl/static/5.7.2/socialschools/css/img/background.png',
  btnPrimaryBgHighlight: 'darken(@btn-primary-bg, 10%)',
  btnPrimaryBorderHighlight: 'darken(@btn-primary-bg, 17%)',
  btnPrimaryBorderFocus: 'darken(@btn-primary-bg, 30%)',
  avatarSizeBase: '36px',
  avatarSizeLarge: '70px',
  avatarSizeXLarge: '150px',
  avatarSizeSmall: '24px',
  avatarRadiusUser: '50%',
  avatarRadiusGroup: '20%',
  fontFamilyMonospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  iconSizeBase: '18px',
  iconSizeLarge: '24px',
  iconSizeXLarge: '30px',
  iconSizeSmall: '14px',
  headerHeight: '48px',
  sidebarWidth: '240px',
  linkColor: 'setHsl(@brand-primary, {s: 1, l: 32%})',
  textSuccess: 'setHsl(@brand-success, {s: 1, l: 32%})',
  textInfo: 'setHsl(@brand-info, {s: 1, l: 32%})',
  textWarning: 'setHsl(@brand-warning, {s: 1, l: 32%})',
  textDanger: 'setHsl(@brand-danger, {s: 1, l: 32%})',
};
