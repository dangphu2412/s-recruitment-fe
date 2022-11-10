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
  Flex,
  FormLabel,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputMultipleValues } from '@modules/shared/components/Input/InputMultiValues/InputMultiValues';

export type CreateUserInputs = {
  emails: string[];
};

type Props = {
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

export function TableHeader({ onAddNewUser }: Props): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [emails, setEmails] = useState<string[]>([]);

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

  return (
    <Flex justifyContent="space-between" className="pt-6 pb-2">
      <div>
        <Text fontSize="lg" fontWeight="semibold">
          Administrator management
        </Text>
        <Text fontSize="sm" fontWeight="light">
          Where you can create, update and change user active
        </Text>
      </div>

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
            <FormLabel htmlFor="emails">Email</FormLabel>

            <InputMultipleValues
              onAddChange={handleEmailsChange}
              onDeleteChange={handleEmailsChange}
              placeholder="Please enter emails"
            />
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
    </Flex>
  );
}
