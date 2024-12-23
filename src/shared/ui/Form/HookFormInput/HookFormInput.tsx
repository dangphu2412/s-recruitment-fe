import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import type {
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

type Props<T extends FieldValues, N extends FieldPath<T>> = {
  name: N;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  label: ReactNode;
  type?: string;
} & InputProps;

export function HookFormInput<T extends FieldValues, N extends FieldPath<T>>({
  name,
  errors,
  register,
  isRequired,
  label,
  ...rest
}: Props<T, N>) {
  return (
    <FormControl isInvalid={!!errors[name]} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>

      <Input {...register(name)} {...rest} />

      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
}
