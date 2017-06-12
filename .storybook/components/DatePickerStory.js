import React from 'react';
import { storiesOf, action } from '@storybook/react';
import DatePicker from '../../components/DatePicker';
import DatePickerInput from '../../components/DatePickerInput';

const datePickerEvents = {
  onClick: action('onClick'),
  className: 'some-class',
};

const datePickerInputProps = {
  className: 'some-class',
  labelText: 'Select a date',
  onClick: action('onClick'),
  onChange: action('onChange'),
  placeholder: 'mm/dd/yyyy',
  pattern: '\d{1,2}/\d{1,2}/\d{4}'
}

const simpleShortDatePickerInputProps = {
  id: 'simple-date-picker',
  placeholder: 'mm/yyyy',
  pattern: '\d{1,2}/\d{4}',
};

const simpleDatePickerInputProps = {
  id: 'simple-date-picker-2',

};

const singleDatePickerInputProps = {
  id: 'single-date-picker',
};

const rangeDatePickerInputFromProps = {
  id: 'range-date-picker-1',
};

const rangeDatePickerInputToProps = {
  id: 'range-date-picker-2',
};

storiesOf('DatePicker', module)
  .addWithInfo(
    'simple and short',
    `
      A simple Date Picker consists of an input field and no calendar.
    `,
    () => (
      <DatePicker short id="date-picker" datePickerType="simple">
        <DatePickerInput {...datePickerInputProps} {...simpleShortDatePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'simple and normal',
    `
      A simple Date Picker consists of an input field and no calendar.
    `,
    () => (
      <DatePicker id="date-picker" datePickerType="simple">
        <DatePickerInput {...datePickerInputProps} {...simpleDatePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'single with calendar',
    `
      A single Date Picker consists of an input field and a calendar.
    `,
    () => (
      <DatePicker id="date-picker" datePickerType="single">
        <DatePickerInput calendarTrigger {...datePickerInputProps} {...singleDatePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'range with calendar',
    `
      A range Date Picker consists of two input fields and a calendar.
    `,
    () => (
      <DatePicker id="date-picker" datePickerType="range">
        <DatePickerInput {...datePickerInputProps} {...rangeDatePickerInputFromProps} />
        <DatePickerInput {...datePickerInputProps} {...rangeDatePickerInputToProps} />
      </DatePicker>
    )
  )
  ;
