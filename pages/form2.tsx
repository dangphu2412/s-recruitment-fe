/* eslint-disable no-console */
import { NextPageWithLayout } from './_app';
import { NoLayout } from '@modules/shared/components/NoLayout';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

function useFormCtx() {
  return useFormContext();
}

function UserName() {
  console.log('Render username');
  const { register } = useFormCtx();

  return (
    <div>
      <label>Username Name</label>
      <input {...register('username')} />
    </div>
  );
}

function FullName() {
  console.log('Render FullName');
  const { register, control } = useFormCtx();
  // const username = get('username');
  // There are difference between use watch from context and useWatch
  // watch will trigger re-render both 3 components
  // useWatch only trigger re-render this component
  const username = useWatch({ control, name: 'username' });

  return (
    <div>
      <label>Full Name</label>
      <input {...register('fullName')} />
      Username: {username}
    </div>
  );
}

function Other() {
  console.log('Render Other');
  return <>This will not re-render</>;
}

const HookFormPage: NextPageWithLayout = () => {
  // const form = useForm();
  //
  // return (
  //   <FormProvider {...form}>
  //     <UserName />
  //
  //     <br />
  //
  //     <FullName />
  //
  //     <Other />
  //   </FormProvider>
  // );
  return (
    <Menu>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>

      <MenuButton as={Button}>Actions</MenuButton>
    </Menu>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
