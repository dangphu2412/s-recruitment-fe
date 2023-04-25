import {
  BaseNumberProps,
  NumberControlProps,
  NumberProviderProps
} from '@modules/ui-system/components/form/NumberInput/types';
import { useCallback, useState } from 'react';
import { callAllHandlers } from '@modules/ui-system/components/form/NumberInput/utilts';

const SPECIAL_CHAR_IGNORE_MINUS = new RegExp(/[^\w.-]+/g);

function parse(value: string): number {
  return parseFloat(value.replace(SPECIAL_CHAR_IGNORE_MINUS, ''));
}

function clampValue(value: number, min: number, max: number): number {
  if (value == null) return value;

  return Math.min(Math.max(value, min), max);
}

function toPrecision(value: number, precision?: number) {
  const scaleFactor = 10 ** (precision ?? 0);

  const nextValue = Math.round(value * scaleFactor) / scaleFactor;

  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}

export function useCounter({
  step = 1,
  defaultValue,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  precision
}: BaseNumberProps) {
  const [valueState, setValueState] = useState<string>(() => {
    if (typeof defaultValue !== 'undefined') {
      return typeof defaultValue === 'number'
        ? String(defaultValue)
        : defaultValue;
    }

    return '';
  });

  const validate = useCallback(
    (inputValue: number) => {
      if (min && min > inputValue) {
        return false;
      }

      return !(max && max < inputValue);
    },
    [max, min]
  );

  // Function to clamp the value and round it to the precision
  const clamp = useCallback(
    (value: number) => {
      let nextValue = clampValue(value, min, max);

      return toPrecision(nextValue, precision);
    },
    [precision, max, min]
  );

  const update = useCallback(
    (newValue: string) => {
      if ('' === newValue) {
        setValueState('');
        return;
      }

      const parsedValue = parse(newValue);
      const shouldUpdate = validate(parsedValue);

      if (!shouldUpdate) {
        return;
      }

      setValueState(parsedValue.toString());
    },
    [validate]
  );

  const increment = useCallback(() => {
    const parsedValue = parse(valueState) + step;

    setValueState(clamp(parsedValue).toString());
  }, [clamp, step, valueState]);

  const decrement = useCallback(() => {
    const parsedValue = parse(valueState) - step;

    setValueState(clamp(parsedValue).toString());
  }, [clamp, step, valueState]);

  return {
    value: valueState,
    update,
    increment,
    decrement,
    clamp
  };
}

export function useNumberControl(
  props: NumberControlProps
): NumberProviderProps {
  const {
    defaultValue,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    precision
  } = props;

  const { value, update, increment, decrement, clamp } = useCounter({
    step,
    min,
    max,
    precision,
    defaultValue
  });

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update(e.target.value);
    },
    [update]
  );

  const onBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const clamped = clamp(parse(e.target.value));

      update(clamped);
    },
    [clamp, update]
  );

  const getInputProps = useCallback(() => {
    return {
      defaultValue,
      min,
      max,
      step,
      precision,
      onChange: callAllHandlers(onChange, props.onChange),
      onBlur: callAllHandlers(onBlur, props.onBlur),
      value: value
    };
  }, [defaultValue, max, min, onBlur, onChange, precision, props, step, value]);

  const getIncrementProps = useCallback(() => {
    return {
      onClick: () => {
        increment();
      }
    };
  }, [increment]);

  const getDecrementProps = useCallback(() => {
    return {
      onClick: () => decrement()
    };
  }, [decrement]);

  return {
    value: value,
    getInputProps,
    getIncrementProps,
    getDecrementProps
  };
}
