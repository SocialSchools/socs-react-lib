/**
*
* Select
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorSvg from '../../../utils/colorSvg';
import Option from '../Option';

function hasClass(classNames, search) {
  if (!classNames) {
    return false;
  }
  return classNames.split(/ +/).includes(search);
}

function getStyledDropdown(p) {
  const bsOpen = hasClass(p.className, 'bs-open');
  return colorSvg('dropdown', bsOpen && '#555');
}

const StyledSelect = styled.select`
  &, &.form-control {
    appearance: none; 
    padding-right: 30px;
    background: url(${getStyledDropdown}) right 8px top 8px no-repeat;
    background-size: 16px;
    &.auto-width {
      width: auto;
    }
  }
`;

function Select(props) {
  const {
    value, onChange, onCancel, options, disabled, className, placeholder, onPopup, ...rest
  } = props;
  const placeholderClass = placeholder && value === undefined ? 'placeholder' : '';
  const newClass = `form-control ${className} ${placeholderClass}`;
  function handleEscape(ev) {
    if (ev.key === 'Escape') {
      onCancel();
    }
  }
  return (
    <StyledSelect
      className={newClass}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onKeyDown={handleEscape}
      {...rest}
    >
      {placeholder && <Option value={0} key="-" label={placeholder} />}
      {options.map((option) => (
        <Option key={option.value === undefined ? '---' : option.value} value={option.value} label={option.label} />
      ))}
    </StyledSelect>
  );
}

Select.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onPopup: PropTypes.func,
  options: PropTypes.array,
};

Select.defaultProps = {
  className: '',
};

export default Select;
