/* eslint-disable no-console */
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from '../_app';
import { NumberInputControl } from '@modules/ui-system/components/form/NumberInput/Control/NumberInputControl';
import { NumberInputField } from '@modules/ui-system/components/form/NumberInput/Input/NumerInputField';
import { NumberDecrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberDecrementStepper';
import { NumberIncrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberIncrementStepper';
import { useCounter } from 'react-use';

const HookFormPage: NextPageWithLayout = () => {
  const [v, action] = useCounter(0);

  return (
    <div className="flex flex-col gap-6">
      <NumberInputControl
        className="flex gap-4"
        max={99999}
        min={-10}
        defaultValue={0}
      >
        <NumberDecrementStepper />
        <NumberInputField />
        <NumberIncrementStepper />
      </NumberInputControl>

      <NumberInputControl
        className="flex gap-4"
        max={999.99}
        min={-99}
        precision={2}
        step={0.02}
      >
        <NumberDecrementStepper />
        <NumberInputField />
        <NumberIncrementStepper />
      </NumberInputControl>

      <hr />

      <input
        type="number"
        value={v}
        onChange={e => {
          console.log(e.target.value);
          console.log(e);
          action.set(e.target.value);
          console.log(e);
        }}
      />
    </div>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
