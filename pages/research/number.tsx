/* eslint-disable no-console */
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from '../_app';
import { NumberInputControl } from '@modules/ui-system/components/form/NumberInput/Control/NumberInputControl';
import { NumberInputField } from '@modules/ui-system/components/form/NumberInput/Input/NumerInputField';
import { NumberDecrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberDecrementStepper';
import { NumberIncrementStepper } from '@modules/ui-system/components/form/NumberInput/Stepper/NumberIncrementStepper';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

const HookFormPage: NextPageWithLayout = () => {
  const [value, setValue] = useState('');
  const { control, handleSubmit } = useForm();

  function handleChange(e) {
    setValue(e.target.value);
  }

  const handleBlur = e => {
    const inputValue = e.target.value;
    console.log('Blur', inputValue);
    let sanitizedValue = inputValue.replace(/[^0-9]/g, ''); // remove non-digit characters
    if (inputValue.startsWith('-')) {
      sanitizedValue = '-' + sanitizedValue; // add back the minus sign if it was there
    }
    setValue(sanitizedValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <Controller
        control={control}
        name="inputC"
        render={({ field }) => {
          return (
            <NumberInputControl
              className="flex gap-4"
              defaultValue={0}
              max={99999}
              min={-10}
              onChange={field.onChange}
            >
              <NumberInputField />
            </NumberInputControl>
          );
        }}
      />

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

      <label>Text</label>

      <input
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
