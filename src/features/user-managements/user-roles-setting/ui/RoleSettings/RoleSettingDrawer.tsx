import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { RoleSettings } from './RoleSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

type Props = {
  isDisabled: boolean;
};

export function RoleSettingDrawer({ isDisabled }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOpen() {
    if (isDisabled) return;

    onOpen();
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant={'outline'}
        color={'primary'}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Role Settings</DrawerHeader>
          <DrawerBody>
            <RoleSettings />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
