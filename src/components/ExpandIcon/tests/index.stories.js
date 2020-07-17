import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import ExpandButton from '../index';

storiesOf('ExpandButton', module)
  .add('ExpandButton', () => (
    <ExpandButton />
  ));
