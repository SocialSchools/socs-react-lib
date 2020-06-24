/**
 *
 * FormattedHtmlMessage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DangerouslySetInnerHtml from './index';

function FormattedHtmlMessage(props) {
  return (
    <FormattedMessage {...props}>
      {(text) => <DangerouslySetInnerHtml>{text}</DangerouslySetInnerHtml>}
    </FormattedMessage>
  );
}

export default FormattedHtmlMessage;

