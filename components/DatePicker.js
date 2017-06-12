import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Flatpickr from 'flatpickr';

class DatePicker extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    short: false
  };

  componentDidMount() {
    this.initDatePickerCalendar();
  }

  initDatePickerCalendar = () => {
    const calendar = new Flatpickr('#range-date-picker-1', {
      mode: this.props.datePickerType,
      allowInput: true
    });
  }

  render() {
    const {
      children,
      className,
      short,
      datePickerType,
      ...other
    } = this.props;

    const datePickerClasses = classNames('bx--date-picker', className, {
      'bx--date-picker--short': short,
      'bx--date-picker--simple': datePickerType === 'simple',
      'bx--date-picker--single': datePickerType === 'single',
      'bx--date-picker--range': datePickerType === 'range',
    })

    const datePickerIcon = (datePickerType === 'range')
    ? (<svg className="bx--date-picker__icon" width="17" height="19" viewBox="0 0 17 19">
        <path d="M12 0h2v2.7h-2zM3 0h2v2.7H3z"/>
        <path d="M0 2v17h17V2H0zm15 15H2V7h13v10z"/>
        <path d="M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z"/>
      </svg>)
    : '';

    const childArray = React.Children.toArray(children);

    const childrenWithProps =
      childArray.map((child) => {
        return React.cloneElement(child, {
          datePickerType,
        });
      });

    return (
     <div className="bx--form-item">
      <div className={datePickerClasses} {...other}>
        {childrenWithProps}
        {datePickerIcon}
      </div>
    </div>
    );
  }
}

export default DatePicker;
