import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputMultipleValues } from '@modules/shared/components/Input';
import { MonthlyMoneyConfig } from '@modules/monthly-money/clients/monthly-money.types';
import { CreateUserType } from '@modules/user/constants/admin-management.constants';

export type CreateUserInputs = {
  emails: string[];
};

type Props = {
  monthlyMoneyConfigs: MonthlyMoneyConfig[];
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

export function HeaderActions({
  onAddNewUser,
  monthlyMoneyConfigs
}: Props): React.ReactElement {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const monthlyMoneyConfigSelectedRef = React.useRef<HTMLSelectElement>(null);

  const [emails, setEmails] = useState<string[]>([]);
  const [createUserType, setCreateUserType] = useState<CreateUserType>(
    CreateUserType.NEWBIE
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleEmailsChange(newEmails: string[]) {
    setEmails(newEmails);
  }

  function handleSaveUser(): void {
    const createUserInputs: CreateUserInputs = {
      emails
    };

    onAddNewUser(createUserInputs);
    onClose();
  }

  function handleSelectUserType(
    e: React.SyntheticEvent<HTMLSelectElement, Event>
  ) {
    setCreateUserType(e.currentTarget.value as CreateUserType);
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add new members
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new S-Group members</DrawerHeader>

          <DrawerBody className="space-y-2">
            <FormControl>
              <FormLabel htmlFor="create-user-type">Create type</FormLabel>

              <Select
                ref={monthlyMoneyConfigSelectedRef}
                placeholder="Select option"
                name="create-user-type"
                value={createUserType}
                onChange={handleSelectUserType}
              >
                {Object.values(CreateUserType).map(type => {
                  return <option value={type}>{type}</option>;
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="emails">Email</FormLabel>

              <InputMultipleValues
                onAddChange={handleEmailsChange}
                onDeleteChange={handleEmailsChange}
                placeholder="Please enter emails"
                name="emails"
              />
            </FormControl>

            {createUserType === CreateUserType.NEW_MEMBERS && (
              <FormControl>
                <FormLabel htmlFor="monthly-configs">Monthly paid</FormLabel>

                <Select
                  ref={monthlyMoneyConfigSelectedRef}
                  placeholder="Select option"
                  name="monthly-configs"
                >
                  {monthlyMoneyConfigs.map(config => {
                    return (
                      <option value={config.id}>
                        {`${config.amount}K / ${config.monthRange} month`}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveUser}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
