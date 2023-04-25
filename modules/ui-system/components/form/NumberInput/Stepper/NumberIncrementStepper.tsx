import { forwardRef, ReactElement } from 'react';
import { useNumberInputProvider } from '@modules/ui-system/components/form/NumberInput/number.context';

export const NumberIncrementStepper = forwardRef(
  function NumberIncrementStepper(customProps, ref): ReactElement {
    const { getIncrementProps } = useNumberInputProvider();
    const props = getIncrementProps();

    return (
      <span onClick={props.onClick} ref={ref}>
        +
      </span>
    );
  }
);
