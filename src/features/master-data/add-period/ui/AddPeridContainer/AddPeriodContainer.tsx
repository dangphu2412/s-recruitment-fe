import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { AddPeriodDrawer } from './AddUserDrawer';
import { AddButton } from 'src/shared/ui/Button';

export function AddPeriodContainer(): React.ReactElement {
  const addNewButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  return (
    <>
      <AddButton ref={addNewButtonRef} onClick={onOpen} />

      {isOpen && (
        <AddPeriodDrawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={addNewButtonRef}
        />
      )}
    </>
  );
}
