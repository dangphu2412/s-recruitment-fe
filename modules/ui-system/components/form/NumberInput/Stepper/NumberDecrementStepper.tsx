// @flow
import * as React from 'react';
import { useNumberInputProvider } from '@modules/ui-system/components/form/NumberInput/number.context';
import { forwardRef } from 'react';

type Props = {};

export const NumberDecrementStepper = forwardRef(
  function NumberDecrementStepper(customProps, ref) {
    const { getDecrementProps } = useNumberInputProvider();
    const props = getDecrementProps();

    return (
      <span onClick={props.onClick} ref={ref}>
        -
      </span>
    );
  }
);
