import styled from 'styled-components';
import { ProgressBar } from 'react-bootstrap';

const PrimaryProgressBar = styled(ProgressBar)`
  &.progress {
    margin: 1px;
    background-color: rgba(0,0,0,0.8);
    height: 14px;
  }
  .progress-bar {
    background-color: ${(props) => props.theme.brandPrimary};
    line-height: 14px;
  }
`;

export default PrimaryProgressBar;
