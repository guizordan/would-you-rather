import React, { Component } from "react";
import { PropTypes } from "prop-types";

/**
 * @description An html Select component
 */
class Select extends Component {
  static propTypes = {
    value: PropTypes.string,
    labelKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onChangeValue: PropTypes.func,
    options: PropTypes.array.isRequired,
  };

  onChange = e => {
    const { onChange, onChangeValue } = this.props;
    const { value } = e.target;

    if (onChangeValue) onChangeValue(value || "");
    if (onChange) onChange(e);
  };

  render() {
    const {
      value,
      label,
      labelKey,
      placeholder,
      options,
      disabled,
      required,
    } = this.props;

    const renderOptions = options.map((option, index) => (
      <option key={index} value={option[labelKey]}>
        {option[label]}
      </option>
    ));

    const renderPlaceholder = placeholder ? (
      <option value="">{placeholder}</option>
    ) : (
      ""
    );

    return (
      <select
        className="form-control"
        defaultValue={value}
        disabled={disabled}
        required={required}
        onChange={this.onChange}
      >
        {renderPlaceholder}
        {renderOptions}
      </select>
    );
  }
}

Select.defaultProps = {
  labelKey: "id",
};

export default Select;
