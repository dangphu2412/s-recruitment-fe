import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { AddUserDrawer } from './AddUserDrawer';
import { AddButton } from '../../../../../shared/ui/Button';

export function AddUsersContainer(): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  return (
    <>
      <AddButton ref={addNewUserButtonRef} onClick={onOpen} />

      {isOpen && (
        <AddUserDrawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={addNewUserButtonRef}
        />
      )}
    </>
  );
}
