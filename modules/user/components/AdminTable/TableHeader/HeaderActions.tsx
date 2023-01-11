import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateUserType } from '@modules/user/constants/admin-management.constants';
import { AddUserDrawer } from '@modules/user/components/AdminTable/TableHeader/AddUserDrawer';
import { useQueryMonthlyMoneyConfigs } from '@modules/monthly-money/hooks';
import { useMutateCreateUser } from '@modules/user/hooks/data/useMutateCreateUser';

export type CreateUserInputs = {
  createType: CreateUserType;
  emails: Array<string>;
  monthlyConfigId?: string;
  isSilentCreate: boolean;
};

export function HeaderActions(): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  const { data: monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: isOpen
  });

  const { mutate, isLoading } = useMutateCreateUser();

  function handleAddNewUser(createUserInputs: CreateUserInputs): void {
    mutate({
      createUserType: createUserInputs.createType,
      emails: createUserInputs.emails,
      monthlyConfigId: createUserInputs.monthlyConfigId,
      isSilentCreate: createUserInputs.isSilentCreate
    });
  }

  return (
    <>
      <Button ref={addNewUserButtonRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add
      </Button>

      {isOpen && (
        <AddUserDrawer
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          finalFocusRef={addNewUserButtonRef}
          onAddNewUser={handleAddNewUser}
          monthlyMoneyConfigs={monthlyMoneyConfigs ?? []}
        />
      )}
    </>
  );
}
