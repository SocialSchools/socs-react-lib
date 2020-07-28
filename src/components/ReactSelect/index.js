/**
*
* ReactSelect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { components } from 'react-select';
import placeholderMixin from '../../styles/placeholderMixin';
import Select from './Select';
import Icon from '../Icon';
import ReactSelect from './SelectFix';

export const reactSelectMixin = css`
  .rs__control.rs__control {
    border: 1px solid #dddddd;
    border-radius: 16px;
    min-height: 34px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    &:focus, &:hover {
      border-color: #777777;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(119, 119, 119, 0.6);
    }
    .rs__indicator {
      padding: 6px 8px;
      .ss-dropdown {
        font-size: 21px;
      }
    }
    .rs__option--is-focused {
      background-color: #eee;
    }
    .rs__placeholder {
      ${placeholderMixin};
    }
    .rs__multi-value, .rs__multi-value__remove {
      border-radius: 12px;
    }
  }
  .has-error.has-error .rs__control {
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  .has-error.has-error .rs__control:focus {
    border-color: #843534;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  }
`;

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <Icon className="ss-dropdown" />
  </components.DropdownIndicator>
);

function getValue(o) {
  if (!o || typeof o !== 'object') {
    return o;
  }
  return Array.isArray(o) ? o.map((i) => i.value) : o.value;
}

export function LargeSelect(props) {
  const {
    value, options, onChange, components: orgComponents, isMulti,
  } = props;
  const selected = isMulti
    ? options.filter((o) => value.includes(o.value))
    : options.find((o) => o.value === value);
  const handleChange = (o) => onChange(getValue(o));
  const newComponents = {
    DropdownIndicator,
    ...orgComponents,
  };
  return (
    <ReactSelect
      {...props}
      classNamePrefix="rs"
      value={selected}
      components={newComponents}
      onChange={handleChange}
    />
  );
}

LargeSelect.propTypes = {
  components: PropTypes.object,
  isMulti: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

LargeSelect.defaultProps = {
  components: {},
};

export function SmallSelect(props) {
  const {
    options, onChange, isMulti, isDisabled, placeholder, value,
  } = props;
  const indentedOptions = options.map((option) => (option.indent ? { ...option, label: `• ${option.label}` } : option));
  if (indentedOptions[0] && indentedOptions[0].value) {
    indentedOptions.unshift({ label: `--${placeholder || 'Select'}--` });
  }
  if (!isMulti) {
    const handleChange = (ev) => onChange(ev.target && ev.target.value);
    return <Select value={value || ''} options={indentedOptions} disabled={isDisabled} onChange={handleChange} />;
  }
  const handleChange = (ev) => onChange(Array.from(ev.target.options)
    .filter((opt) => opt.selected)
    .map((opt) => opt.value));
  return (
    <Select
      value={value}
      multiple
      options={indentedOptions}
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
}

SmallSelect.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
};

SmallSelect.defaultProps = {
};

function SizeSelect(props) {
  const { large, ...rest } = props;
  return large || window.matchMedia('(min-width: 480px)').matches
    ? <LargeSelect {...rest} /> : <SmallSelect {...rest} />;
}

SizeSelect.propTypes = {
  large: PropTypes.bool,
};

export default SizeSelect;
