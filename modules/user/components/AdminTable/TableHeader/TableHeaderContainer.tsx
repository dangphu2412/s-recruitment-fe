import React from 'react';
import { useMutateCreateUser } from '@modules/user/hooks/data/useMutateCreateUser';
import { CreateUserInputs, TableHeader } from './TableHeader';

export function TableHeaderContainer(): React.ReactElement {
  const { mutate } = useMutateCreateUser();

  function handleAddNewUser(createUserInputs: CreateUserInputs) {
    mutate(
      createUserInputs.emails.map(email => {
        return {
          email
        };
      })
    );
  }

  return (
    <>
      <TableHeader onAddNewUser={handleAddNewUser} />
    </>
  );
}
