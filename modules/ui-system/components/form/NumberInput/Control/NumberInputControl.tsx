// @flow
import * as React from 'react';
import { forwardRef } from 'react';
import { NumberInputProvider } from '../number.context';
import { NumberControlProps } from '@modules/ui-system/components/form/NumberInput/types';
import { useNumberControl } from '@modules/ui-system/components/form/NumberInput/hooks';

export const NumberInputControl = forwardRef<
  HTMLInputElement,
  NumberControlProps
>(function NumberInput(props: NumberControlProps, ref) {
  const numberControl = useNumberControl(props);

  return (
    <NumberInputProvider value={numberControl}>
      <div {...props} ref={ref} />
    </NumberInputProvider>
  );
});
