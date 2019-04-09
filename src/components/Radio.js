import React from "react";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

/**
 * @description A Radio button
 */
const Radio = props => {
  const { value, label, checked } = props;

  const onChange = e => {
    props.onChange(e.target.value);
  };

  return (
    <Form.Check
      custom
      inline
      id={value}
      type="radio"
      label={label}
      value={value}
      onChange={onChange}
      checked={checked === value}
    />
  );
};

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.string,
  label: PropTypes.any,
};

export default Radio;
