import styled from 'styled-components';

const withColor = (p) => (p.color ? `color: ${p.color}` : '');
const withSize = (p) => (p.size ? `font-size: ${p.size}` : '');

const Icon = styled.i`
  display: inline-block;
  font-weight: normal;
  &.ss-external-link {
    opacity: 0.7;
    margin-left: 2px;
    font-size: 0.75em;
    height: 1em;
    line-height: 1.5em;
    vertical-align: top;
  }
  &.ss-checkmark,
  &.ss-check-sign {
    color: ${(p) => p.theme.brandSuccess};
  }
  &.ss-delete {
    color: ${(p) => p.theme.brandDanger};
  }

  &.ss-checkmark,
  &.ss-check-sign,
  &.ss-navigateleft,
  &.ss-check-empty {
    transform: translateY(10%);
  }

  &.ss-draw,
  &.ss-checkclipboard,
  &.ss-checkmark,
  &.ss-navigateleft,
  &.ss-check-sign,
  &.ss-check-empty {
    font-size: 110%;
  }

  ${withColor};
  ${withSize};
`;

export default Icon;
