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
  Input,
  Textarea
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import {
  useCreateUserGroupMutation,
  USER_GROUPS_QUERY_KEY
} from '../../../../../entities/user/models/user-group.model';
import { UserCombobox } from '../../../../../entities/user/ui/UserCombobox/UserCombobox';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../../../shared/models/notify';
import { BoxItem } from '../../../../../shared/models/combobox.api';

export type CreateUserGroupInputs = {
  name: string;
  description: string;
  users: BoxItem[];
};

type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;

export function AddUserGroupDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control
  } = useForm<CreateUserGroupInputs>({
    mode: 'onChange'
  });
  const { field: userControllerProps } = useController({
    control,
    name: 'users',
    rules: {
      required: 'Users are required'
    }
  });

  const { mutate: dispatchCreateUserGroup } = useCreateUserGroupMutation();
  const queryClient = useQueryClient();
  const notify = useNotify();

  const saveUser: SubmitHandler<CreateUserGroupInputs> = createUserInputs => {
    dispatchCreateUserGroup(
      {
        name: createUserInputs.name,
        description: createUserInputs.description,
        userIds: createUserInputs.users.map(user => user.value)
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [USER_GROUPS_QUERY_KEY]
          });
          reset();
          onClose();
          notify({
            title: 'User group created',
            status: 'success'
          });
        }
      }
    );
  };

  return (
    <>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create New Group</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Name</FormLabel>

            <Input
              type={'text'}
              {...register('name', {
                required: 'Name is required'
              })}
              placeholder={'Enter group name'}
            />

            {errors.name && (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.users}>
            <FormLabel>Users</FormLabel>
            <UserCombobox {...userControllerProps} />

            {errors.users && (
              <FormErrorMessage>{errors.users.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>Description</FormLabel>

            <Textarea
              {...register('description', {
                required: 'Description is required'
              })}
              placeholder={'Enter group description'}
            />

            {errors.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
