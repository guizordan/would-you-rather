import React from "react";
import { Form } from "react-bootstrap";

export default props => {
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
