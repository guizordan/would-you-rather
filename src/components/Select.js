import React, { Component } from "react";
import { PropTypes } from "prop-types";

/**
 * @author Guilherme Zordan
 * @description Select HTML component
 * @example
 * <Select
 *  value={this.state.person}
 *  label="name"
 *  placeholder="Select a person"
 *  required
 *  onChangeValue={person => this.setState({ person })}
 *  options={[
 *  { name: "Augusto", id: 9 },
 *  { name: "Jose", id: 10 },
 *  { name: "Adão", id: 8 }
 *  ]}
 * />
 */
class Select extends Component {
  state = { error: "" };

  static propTypes = {
    // index of the selected option
    value: PropTypes.string,
    // chave para buscar o index do array
    key: PropTypes.string,
    // chave para buscar a descricao da option
    label: PropTypes.string.isRequired,
    // option default
    placeholder: PropTypes.string,
    // passa o evento para cima
    onChange: PropTypes.func,
    // passa o index da option selecionada para cima
    onChangeValue: PropTypes.func,
    // options array
    options: PropTypes.array.isRequired,
  };

  onChange = e => {
    const { onChange, onChangeValue } = this.props;
    const value = e.target.value;

    this.validate(value);

    if (onChangeValue) onChangeValue(value || "");
    if (onChange) onChange(e);
  };

  validate = value => {
    const { required } = this.props;
    let error = required && !value ? "This field is mandatory" : "";
    this.setState({ error });
  };

  render() {
    const { error } = this.state;
    const {
      value,
      label,
      id,
      placeholder,
      options,
      className,
      disabled,
      required,
    } = this.props;

    const renderErrorMessage = () => {
      if (error) {
        return <div className="invalid-feedback">{error}</div>;
      }
    };

    const renderOptions = () => {
      return options.map((option, index) => (
        <option key={index} value={option[id]}>
          {option[label]}
        </option>
      ));
    };

    const renderPlaceholder = () => {
      if (placeholder) return <option value="">{placeholder}</option>;
    };

    return (
      <>
        <select
          className={`form-control ${
            !error || error === "OK" ? "" : "is-invalid"
          } ${className}`}
          defaultValue={value}
          disabled={disabled}
          required={required}
          onChange={this.onChange}
        >
          {renderPlaceholder()}
          {renderOptions()}
        </select>
        {renderErrorMessage()}
      </>
    );
  }
}

Select.defaultProps = {
  id: "id",
};

export default Select;
