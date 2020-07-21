import styled, { css } from 'styled-components';
import { Badge } from 'react-bootstrap';

const withColor = css`
  background-color: ${(p) => p.color};
  color: #fff;
`;

const limitWidth = css`
  max-width: ${((p) => p.maxwidth)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledBadge = styled(Badge)`
  &&&.badge {
    margin-left: 0.5rem;
    ${(p) => (p.color ? withColor : '')};
    ${(p) => (p.maxwidth ? limitWidth : '')};
    flex-shrink: 0;
  }
`;

export default StyledBadge;
