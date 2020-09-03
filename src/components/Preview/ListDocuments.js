/**
 *
 * ListDocuments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, ListGroup } from 'react-bootstrap';
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
    ${FileIconMixin};
    margin-right: 0.5rem;
    font-size: 24px;
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
        <ListGroup.Item action={!onRemove} key={file.id} href={onRemove ? '' : file.fullPath} className="px-1">
          <LinkWrapper>
            <Icon className={`text-primary ${getTypeIcon(file)}`} />
            <span>{file.fileName}</span>
            {file.loading && <OtherProgressBar now={file.progress} label={`${file.progress}%`} />}
            {onRemove
                && (
                <Button variant="link" aria-label="trash" onClick={onRemove(file)}>
                  <Icon className="ss-delete" />
                </Button>
                )}
          </LinkWrapper>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

ListDocuments.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
};

export default ListDocuments;
