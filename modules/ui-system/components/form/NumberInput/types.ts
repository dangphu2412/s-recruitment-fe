import { HTMLProps } from 'react';

export type BaseNumberProps = {
  step?: number;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  precision?: number;
};

export type NumberControlProps = HTMLProps<HTMLInputElement> &
  BaseNumberProps & {
    onChange?: (value: string) => void;
    value?: string;
  };

export type NumberProviderProps = {
  value: any;
  getInputProps: (
    customProps: HTMLProps<HTMLInputElement>
  ) => HTMLProps<HTMLInputElement>;
  getIncrementProps: () => HTMLProps<HTMLInputElement>;
  getDecrementProps: () => HTMLProps<HTMLInputElement>;
};
