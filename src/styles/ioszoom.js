/* From: https://www.warrenchandler.com/2019/04/02/stop-iphones-from-zooming-in-on-form-fields/ */

import { css } from 'styled-components';

const coreCss = css`
  select, textarea, input[type="text"], input[type="password"],
  input[type="datetime"], input[type="datetime-local"],
  input[type="date"], input[type="month"], input[type="time"],
  input[type="week"], input[type="number"], input[type="email"],
  input[type="url"],
  select.form-control, textarea.form-control,
  input.form-control[type="text"], input.form-control[type="password"],
  input.form-control[type="datetime"], input.form-control[type="datetime-local"],
  input.form-control[type="date"], input.form-control[type="month"], input.form-control[type="time"],
  input.form-control[type="week"], input.form-control[type="number"], input.form-control[type="email"],
  input.form-control[type="url"] { font-size: 16px; }
`;

const withFormControl = css`
  ${coreCss};
  .form-control {
    ${coreCss};
  }
`;

const iosCss = css`
/*** iPhone and iOS Form Input Zoom Fixes ***/
/* Fix Input Zoom on devices older than iPhone 5: */
@media screen and (device-aspect-ratio: 2/3) {
  ${withFormControl};
}

/* Fix Input Zoom on iPhone 5, 5C, 5S, iPod Touch 5g */
@media screen and (device-aspect-ratio: 40/71) {
  ${withFormControl};
}

/* Fix Input Zoom on iPhone 6, iPhone 6s, iPhone 7  */
@media screen and (device-aspect-ratio: 375/667) {
  ${withFormControl};
}

/* Fix Input Zoom on iPhone 6 Plus, iPhone 6s Plus, iPhone 7 Plus, iPhone 8, iPhone X, XS, XS Max  */
@media screen and (device-aspect-ratio: 9/16) {
  ${withFormControl};
}`;

export default iosCss;
