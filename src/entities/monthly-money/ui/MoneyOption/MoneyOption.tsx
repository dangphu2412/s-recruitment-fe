import React, { forwardRef } from 'react';
import { MonthlyMoneyConfig } from '../../api';

type MoneyOptionProps = MonthlyMoneyConfig;

export const MoneyOption = forwardRef<HTMLOptionElement, MoneyOptionProps>(
  ({ id, amount, monthRange, ...rest }, ref) => {
    return (
      <option value={id as number} {...rest} ref={ref}>
        {amount} / {monthRange} months
      </option>
    );
  }
);
