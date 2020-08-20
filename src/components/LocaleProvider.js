import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import messages from '../translations';

let libLocale = 'nl';

export function setLibLocale(loc) {
  libLocale = loc === 'nl' ? 'nl' : 'en';
}

function LocaleProvider(props) {
  const { children } = props;
  return (
    <IntlProvider locale={libLocale} messages={messages[libLocale]}>
      {children}
    </IntlProvider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
