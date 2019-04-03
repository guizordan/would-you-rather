import { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Quantifier extends PureComponent {
  static propTypes = {
    quantity: PropTypes.number.isRequired,
    singular: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
  };

  render() {
    const { quantity, plural, singular } = this.props;
    const text = quantity === 1 ? singular : plural;
    return `${quantity} ${text}`;
  }
}
