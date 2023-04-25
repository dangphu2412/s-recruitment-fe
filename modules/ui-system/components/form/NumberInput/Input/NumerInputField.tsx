import * as React from 'react';
import { useNumberInputProvider } from '@modules/ui-system/components/form/NumberInput/number.context';
import { forwardRef, HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement>;

export const NumberInputField = forwardRef<HTMLInputElement, Props>(
  function NumberInputField(props: Props, ref) {
    const { getInputProps } = useNumberInputProvider();
    const inputProps = getInputProps(props);

    return <input type="number" {...inputProps} />;
  }
);
