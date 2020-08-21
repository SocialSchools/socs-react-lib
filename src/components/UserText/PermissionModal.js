/**
 *
 * UserText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Modal, Button } from 'react-bootstrap';
import { STATUS_LINK, STATUS_EMBED } from '../../utils/embedVideo';
import LocaleProvider from '../LocaleProvider';
import Icon from '../Icon';
import messages from './messages';

const FlexButton = styled(Button)`
  display: flex;
  padding: 10px 0;
  align-items: center;
  white-space: normal;
  text-align: left;
  color: ${(p) => p.theme.brandPrimary}
  & > i {
    margin: 0 10px;
    font-size: 24px;
  }
`;

function PermissionModal(props) {
  const { onChange, onHide } = props;
  const handleChange = (val) => () => onChange(val);
  const values = { provider: 'YouTube' };
  return (
    <LocaleProvider>
      <Modal show animation={false} onHide={onHide}>
        <Modal.Header closeButton>
          <h4 className="modal-title"><FormattedMessage {...messages.header} /></h4>
        </Modal.Header>
        <Modal.Body>
          <p><FormattedMessage {...messages.explain} values={values} /></p>
          <FlexButton variant="link" onClick={handleChange(STATUS_EMBED)}>
            <Icon className="ss-checkmark text-success" />
            <FormattedMessage {...messages.embed} values={values} />
          </FlexButton>
          <FlexButton variant="link" onClick={handleChange(STATUS_LINK)}>
            <Icon className="ss-delete text-danger" />
            <FormattedMessage {...messages.link} values={values} />
          </FlexButton>
        </Modal.Body>
      </Modal>
    </LocaleProvider>
  );
}

PermissionModal.propTypes = {
  onChange: PropTypes.func,
  onHide: PropTypes.func,
};

export default PermissionModal;
