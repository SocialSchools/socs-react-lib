import { css } from 'styled-components';

export const coverImageCss = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: unset;
  @media all and (-ms-high-contrast:none) {
    height: auto;
  }
`;

export const centerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const posAbsoluteFullCss = css`
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
