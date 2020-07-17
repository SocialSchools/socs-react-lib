import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import capitalize from 'lodash/capitalize';
import { TestForm } from 'components/storybook';

import Select from '../index';

const colors = ['red', 'yellow', 'blue'];

const defaultValues = { plain: 'red', caps: 'blue' };

storiesOf('tags', module)
  .add('Select', () => (
    <TestForm defaultValues={defaultValues}>
      <Select id="plain" options={colors} />
      <Select id="caps" options={colors} itemToString={capitalize} />
    </TestForm>
  ));
