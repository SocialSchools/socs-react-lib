/**
*
* SelectFix
* Overwrite methods to focus selected value
* https://github.com/JedWatson/react-select/pull/3868
* TODO: remove when pull request applied
*/

// import React from 'react';
// import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

class SelectFix extends ReactSelect {
  componentDidMount() {
    this.select.openMenu = this.openMenu;
    this.select.getNextFocusedOption = this.getNextFocusedOption;
  }

  openMenu(focusOption) {
    const { menuOptions, selectValue, isFocused } = this.state;
    const { isMulti, options } = this.props;
    let openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

    if (!isMulti) {
      const selectedIndex = options.indexOf(selectValue[0]);
      if (selectedIndex > -1) {
        openAtIndex = selectedIndex;
      }
    }

    // only scroll if the menu isn't already open
    this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
    this.inputIsHiddenAfterUpdate = false;

    this.onMenuOpen();
    this.setState({
      focusedValue: null,
      focusedOption: options[openAtIndex],
    });

    this.announceAriaLiveContext({ event: 'menu' });
  }

  getNextFocusedOption(options) {
    const { selectValue: lastFocusedOption } = this.state;
    return lastFocusedOption && options.indexOf(lastFocusedOption[0]) > -1
      ? lastFocusedOption[0]
      : options[0];
  }
}

export default SelectFix;
