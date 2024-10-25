import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { AddUserGroupDrawer } from './AddUserGroupDrawer';
import { AddButton } from '../../../../../shared/ui/Button';

export function AddUserGroupContainer(): React.ReactElement {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createUserGroupDrawer'
  });

  return (
    <>
      <AddButton ref={buttonRef} onClick={onOpen} />

      {isOpen && (
        <AddUserGroupDrawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={buttonRef}
        />
      )}
    </>
  );
}
