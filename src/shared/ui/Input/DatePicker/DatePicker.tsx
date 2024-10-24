import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@chakra-ui/react';

type Props = {
  value: Date | null | undefined;
  onDateChange(date: Date): void;
};

export function DatePicker({ onDateChange, value }: Props): React.ReactElement {
  return (
    <ReactDatePicker
      placeholderText={'Select date'}
      customInput={<Input />}
      selected={value}
      onChange={onDateChange}
    />
  );
}
