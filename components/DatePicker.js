import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Flatpickr from 'flatpickr';
import ReactDOM from 'react-dom';

class DatePicker extends Component {
  state = {
    inputValue: '',
    toInputValue: '',
    calendar: ''
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    short: false
  };

  componentDidMount() {
    if (this.props.datePickerType === 'single' || this.props.datePickerType === 'range') {
      this.initDatePickerCalendar();
    }
  }

  _rightArrowHTML() {
    return (`
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>
      </svg>`
    );
  }

  _leftArrowHTML() {
    return (`
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"></path>
      </svg>`
    );
  }

  initDatePickerCalendar = () => {
    const input = ReactDOM.findDOMNode(this.refs.inputField).querySelector('.bx--date-picker__input');
    const calendar = new Flatpickr(input, {
      mode: this.props.datePickerType,
      allowInput: true,
      dateFormat: 'm/d/Y',
      onClose: (selectedDates) => {
        this._updateClassNames(calendar);
        this._updateInputFields(selectedDates);
      },
      onChange: () => {
        this._updateClassNames(calendar);
      },
      onMonthChange: () => {
        this._updateClassNames(calendar);
      },
      onYearChange: () => {
        this._updateClassNames(calendar);
      },
      onOpen: () => {
        this._updateClassNames(calendar);
      },
      onValueUpdate: (selectedDates) => {
        this.setState({
          inputValue: selectedDates[0]
        })
      },
      nextArrow: this._rightArrowHTML(),
      prevArrow: this._leftArrowHTML(),
    });
    this._updateClassNames(calendar);
    this.setState({
      calendar: calendar
    })
  }

  _updateClassNames = (calendar) => {
    const calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add('bx--date-picker__calendar');
    calendarContainer.querySelector('.flatpickr-month').classList.add('bx--date-picker__month');
    calendarContainer.querySelector('.flatpickr-weekdays').classList.add('bx--date-picker__weekdays');
    calendarContainer.querySelector('.flatpickr-days').classList.add('bx--date-picker__days');
    [...calendarContainer.querySelectorAll('.flatpickr-weekday')].forEach((item) => {
      const currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add('bx--date-picker__weekday');
    });
    [...calendarContainer.querySelectorAll('.flatpickr-day')].forEach((item) => {
      item.classList.add('bx--date-picker__day');
      if (item.classList.contains('today') && calendar.selectedDates.length > 0) {
        item.classList.add('no-border');
      } else if (item.classList.contains('today') && calendar.selectedDates.length === 0) {
        item.classList.remove('no-border');
      }
    });
  }

  _updateInputFields = (selectedDates) => {
    const input = ReactDOM.findDOMNode(this.refs.inputField).querySelector('.bx--date-picker__input');
    if (this.props.datePickerType === 'range') {
      const toInput = ReactDOM.findDOMNode(this.refs.toInputField).querySelector('.bx--date-picker__input');
      if (selectedDates.length === 2) {
        input.value = this._formatDate(selectedDates[0]);
        toInput.value = this._formatDate(selectedDates[1]);
      } else if (selectedDates.length === 1) {
        input.value = this._formatDate(selectedDates[0]);
      }
    } else if (selectedDates.length === 1) {
      input.value = this._formatDate(selectedDates[0]);
    }
    this._updateClassNames(this.state.calendar);
  }

  _formatDate = date => this.state.calendar.formatDate(date, this.state.calendar.config.dateFormat);

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
      childArray.map((child, index) => {
        if (index === 0) {
          return React.cloneElement(child, {
            datePickerType,
            inputValue: this.state.inputValue,
            ref: 'inputField'
          });
        } else if (index === 1) {
          return React.cloneElement(child, {
            datePickerType,
            inputValue: this.state.toInputValue,
            ref: 'toInputField'
          })
        }
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
