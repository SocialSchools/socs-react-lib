import { createGlobalStyle, css } from 'styled-components';
import './fonts.css';
// Icomoon icon fonts
import './icomoon/style.css';

// Enables outline if tab-key used
import '../utils/tabListener';
// General styles and styles for bootstrap components
import iosZoom from './ioszoom';

const iconStyles = css`
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const placeholderMixin = css`
  color: #777;
  font-style: italic;
  opacity: 1 !important;
`;

/* eslint no-unused-expressions: 0 */
const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
    cursor: inherit;
  }

  body {
    height: 100%;
    width: 100%;
    font-family: Ubuntu, Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
    @media screen {
      display: flex;
      flex-direction: column;
    }
  }

  .no-overflow {
    overflow-wrap: anywhere;
  }

  .crop-text {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  body:not(.user-is-tabbing) *:focus {
    outline: none !important;
  }

  body.user-is-tabbing *:focus {
    /* From https://ghinda.net/article/mimic-native-focus-css */
    outline-width: 2px;
    outline-style: solid;
    outline-color: Highlight;

    /* WebKit gets its native focus styles. */
    @media (-webkit-min-device-pixel-ratio:0) {
      outline-color: -webkit-focus-ring-color;
      outline-style: auto;
    }

    /* From bootstrap.css */
    /* border-color: #777777;
    outline: none;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(119, 119, 119, 0.6); */
  }
    
  body.noScroll { /* ...or body.dialogShowing */
    overflow: hidden;
  }

  .pre-line {
    white-space: pre-line;
  }

  .ss-twitter {
    color: #1da1f2;
  }

  .ss-facebook,
  .ss-facebook-square {
    color: #3b5998;
  }

  .label-required::after {
    content: '*';
  }

  .caret.caret {
    border: none !important;
    width: auto;
    height: auto;
    &:before {
      ${iconStyles};
      font-size: 21px;
      content: "\\25be";
    }
  }

  a[download]:after {
    ${iconStyles};
    margin-left: 2px;
    content: "\\eb01";
    /* content: "\f08e"; */
  }

  .avatar-image {
    border-radius: 50%;
  }

  .form-control.form-control::-moz-placeholder {
    ${placeholderMixin};
  }
  .form-control.form-control:-ms-input-placeholder {
    ${placeholderMixin};
  }
  .form-control.form-control::-webkit-input-placeholder {
    ${placeholderMixin};
  }
  
  input[type="date"].form-control,
  input[type="time"].form-control {
    max-width: 12em;
  }

  select.placeholder, option.placeholder {
    ${placeholderMixin};
    & > option:not(.placeholder) {
      font-style: normal;
      color: inherit;
    }
  }

  @media not print {
    .visible-print {
      display: none !important;
    }
  }

  @media print {
    html {
      width: 100%;
    }
    .btn.btn, .btn-group.btn-group, .close.close {
      display: none;
    }
    body.modal-open {
      height: auto;
      overflow: initial !important;
      & > :not([role=dialog]) {
        display: none;
      }
    }
  }
  ${iosZoom};
`;

export default GlobalStyle;
