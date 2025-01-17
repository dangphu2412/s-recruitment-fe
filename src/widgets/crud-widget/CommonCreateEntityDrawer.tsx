import React from 'react';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HeaderDrawerAction } from 'src/shared/ui/Header/ContentHeader/HeaderActionGroup';
import { AddButton } from '../../shared/ui/Button';
import { HookFormInput } from '../../shared/ui/Form/HookFormInput/HookFormInput';
import { useCommonCRUDContext } from './CommonCRUDContext';
import { useMutation, useQueryClient } from 'react-query';
import { useNotify } from '../../shared/models/notify';
import { HookFormTextarea } from '../../shared/ui/Form/HookFormTextarea/HookFormInput';

export function CommonCreateEntityWidget(): React.ReactElement {
  return (
    <HeaderDrawerAction
      id={'create-user'}
      triggerButton={AddButton}
      content={props => <CommonCreateEntityDrawer {...props} />}
    />
  );
}

export function CommonCreateEntityDrawer({
  onClose
}: Pick<UseDisclosureApi, 'onClose'>): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  });
  const schema = useCommonCRUDContext(state => state.schema);
  const mutation = useCommonCRUDContext(state => state.mutation);
  const resource = useCommonCRUDContext(state => state.resource);
  const queryClient = useQueryClient();
  const notify = useNotify();
  const { mutate } = useMutation({
    mutationKey: `${resource}Mutation`,
    mutationFn: mutation
  });

  const save: SubmitHandler<Record<string, any>> = inputs => {
    mutate(inputs, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resource]
        });
        reset();
        onClose();
        notify({
          title: `Create ${resource} successfully`,
          status: 'success'
        });
      }
    });
  };

  return (
    <>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new {resource}</DrawerHeader>

        <DrawerBody className="space-y-4">
          {schema &&
            Object.keys(schema).map(field => {
              const fieldSchema = schema[field];
              if (fieldSchema.type === 'select') {
                return (
                  <FormControl
                    key={field}
                    isInvalid={!!errors[field]}
                    isRequired={fieldSchema.required}
                  >
                    <FormLabel>{fieldSchema.label}</FormLabel>
                    <Select
                      {...register(field, {
                        required: fieldSchema.required
                      })}
                      placeholder={fieldSchema.placeholder}
                    >
                      {(fieldSchema.options ?? []).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                    {!!errors[field] && (
                      <FormErrorMessage>
                        {errors[field]?.message as string}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                );
              }

              if (fieldSchema.type === 'textarea') {
                return (
                  <HookFormTextarea
                    key={field}
                    name={field}
                    label={fieldSchema.label}
                    errors={errors}
                    register={register}
                    isRequired={fieldSchema.required}
                  />
                );
              }

              return (
                <HookFormInput
                  key={field}
                  name={field}
                  label={fieldSchema.label}
                  type={fieldSchema.type}
                  errors={errors}
                  register={register}
                  isRequired={fieldSchema.required}
                />
              );
            })}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(save)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
