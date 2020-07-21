/**
 *
 * ListDocuments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { getTypeIcon, FileIconMixin } from '../../utils/files';
import Icon from '../Icon';
import PrimaryProgressBar from './PrimaryProgressBar';

const OtherProgressBar = styled(PrimaryProgressBar)`
  width: 80px;
  display: inline-block;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  & > i {
    color: ${(props) => props.theme.brandPrimary};
    ${FileIconMixin};
    margin-right: 0.5rem;
    font-size: ${(p) => p.theme.iconSizeLarge};
  }
  & > span {
    flex-grow: 1;
    font-size: smaller;
  }
`;

function ListDocuments(props) {
  const { files, onRemove } = props;
  if (!files || files.length === 0) {
    return null;
  }
  return (
    <ListGroup>
      {files.map((file) => (
        <ListGroupItem key={file.id} href={onRemove ? '' : file.fullPath} className="px-1">
          <LinkWrapper>
            <Icon className={getTypeIcon(file)} />
            <span>{file.fileName}</span>
            {file.loading && <OtherProgressBar now={file.progress} label={`${file.progress}%`} />}
            {onRemove
                && <Button bsStyle="link" icon="ss-delete" aria-label="trash" onClick={onRemove(file)} />}
          </LinkWrapper>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

ListDocuments.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
};

export default ListDocuments;
