import React from 'react';
import {
  Button,
  Checkbox,
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
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { ConfirmExtractEmailsPopup } from '@modules/user/components/AdminTable/TableHeader/ConfirmExtractEmailsPopup';

export type CreateUserInputs = {
  createType: CreateUserType;
  emails: string[];
  monthlyConfigId?: string;
  isSilentCreate: boolean;
};

type Props = {
  monthlyMoneyConfigs: MonthlyMoneyConfig[];
  isOpenExtractEmailConfirmation?: boolean;
  extractedEmails: string[];
  onAddNewUser(createUserInputs: CreateUserInputs): void;
  onAcceptEmailsExtraction(emails: string[]): void;
};

/**
 * Newbie ->
 * - add new user normally and warn about existed users
 * - add new user within skip duplicated users.
 *
 * New members of Sgroup.
 * - Non existing users will fire an error about un existed users.
 * - Upgrade newbie to members would skip updated members.
 */
export function HeaderActions({
  onAddNewUser,
  onAcceptEmailsExtraction,
  monthlyMoneyConfigs,
  isOpenExtractEmailConfirmation = false,
  extractedEmails
}: Props): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { handleSubmit, register, control, watch } = useForm<CreateUserInputs>({
    defaultValues: {
      emails: [],
      createType: CreateUserType.NEWBIE,
      isSilentCreate: false
    }
  });
  const {
    field: { onChange, name: emailsInputName, value: currentEmails }
  } = useController({
    control,
    name: 'emails'
  });
  const createUserType = watch('createType');

  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  const saveUser: SubmitHandler<CreateUserInputs> = inputs => {
    onAddNewUser(inputs);
  };

  function handleAcceptExtractEmails() {
    onAcceptEmailsExtraction?.(currentEmails);
  }

  return (
    <>
      <Button ref={addNewUserButtonRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add new members
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={addNewUserButtonRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new S-Group members</DrawerHeader>

          <DrawerBody className="space-y-2">
            <FormControl>
              <FormLabel htmlFor="create-user-type">Create type</FormLabel>

              <Select placeholder="Select option" {...register('createType')}>
                {Object.values(CreateUserType).map(type => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor={emailsInputName}>Email</FormLabel>

              <InputMultipleValues
                onAddChange={onChange}
                onDeleteChange={onChange}
                placeholder="Please enter emails"
                name={emailsInputName}
                inputValues={extractedEmails}
              />

              <Checkbox marginTop="1rem" {...register('isSilentCreate')}>
                Skip existed emails
              </Checkbox>
            </FormControl>

            {createUserType === CreateUserType.NEW_MEMBERS && (
              <FormControl>
                <FormLabel htmlFor="monthly-configs">Monthly paid</FormLabel>

                <Select
                  placeholder="Select option"
                  {...register('monthlyConfigId')}
                >
                  {monthlyMoneyConfigs.map(config => {
                    return (
                      <option value={config.id} key={config.id}>
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
            <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {isOpenExtractEmailConfirmation && (
        <ConfirmExtractEmailsPopup onAgree={handleAcceptExtractEmails} />
      )}
    </>
  );
}
