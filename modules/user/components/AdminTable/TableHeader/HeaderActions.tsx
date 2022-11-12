import React from 'react';
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
import { SubmitHandler, useController, useForm } from 'react-hook-form';

export type CreateUserInputs = {
  createType: CreateUserType;
  emails: string[];
  monthlyConfigId?: string;
};

type Props = {
  monthlyMoneyConfigs: MonthlyMoneyConfig[];
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

export function HeaderActions({
  onAddNewUser,
  monthlyMoneyConfigs
}: Props): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { handleSubmit, register, control, watch, reset } =
    useForm<CreateUserInputs>({
      defaultValues: {
        emails: [],
        createType: CreateUserType.NEWBIE
      }
    });
  const {
    field: { onChange, name: emailsInputName }
  } = useController({
    control,
    name: 'emails'
  });
  const createUserType = watch('createType');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveUser: SubmitHandler<CreateUserInputs> = inputs => {
    onAddNewUser(inputs);
    reset();
  };

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
              />
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
    </>
  );
}
