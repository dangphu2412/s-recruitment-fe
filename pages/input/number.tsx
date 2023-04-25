/* eslint-disable no-console */
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from '../_app';
import { NumberInputControl } from '@modules/ui-system/components/form/NumberInput/Control/NumberInputControl';
import { NumberInputField } from '@modules/ui-system/components/form/NumberInput/Input/NumerInputField';
import { NumberDecrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberDecrementStepper';
import { NumberIncrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberIncrementStepper';
import { useCounter } from 'react-use';
import { useController, useForm } from 'react-hook-form';

const HookFormPage: NextPageWithLayout = () => {
  const [v, action] = useCounter(0);
  const { register, watch, control, handleSubmit } = useForm();
  const inputController = useController({
    control,
    name: 'inputC'
  });

  const inputValue = watch('inputC');
  console.log(inputValue);

  return (
    <div className="flex flex-col gap-6">
      <NumberInputControl
        className="flex gap-4"
        defaultValue={0}
        max={99999}
        min={-10}
        onChange={inputController.field.onChange}
      >
        <NumberDecrementStepper />
        <NumberInputField />
        <NumberIncrementStepper />
      </NumberInputControl>

      <button
        onClick={handleSubmit(data => {
          console.log(data);
        })}
      >
        Submit
      </button>

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

      <input type="number" {...register('input')} />
    </div>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
