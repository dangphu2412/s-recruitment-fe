import type { SelectProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import type {
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

export type SelectItem = {
  id: string;
  name: string;
};

type Props<T extends FieldValues, N extends FieldPath<T>> = {
  name: N;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  label: ReactNode;
  type?: string;
  options: Array<SelectItem>;
  disabled?: boolean;
} & SelectProps;

export function HookFormSelect<T extends FieldValues, N extends FieldPath<T>>({
  name,
  errors,
  register,
  isRequired,
  label,
  options,
  ...rest
}: Props<T, N>) {
  return (
    <FormControl isInvalid={!!errors[name]} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>

      <Select {...register(name)} {...rest}>
        {options?.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </Select>

      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
}
