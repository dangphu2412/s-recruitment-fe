import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ImportUsersDrawer } from './ImportUsersModal';

export function ImportUsersContainer(): React.ReactElement {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'ImportDrawer'
  });

  return (
    <>
      <Button colorScheme="pink" onClick={onOpen} ref={btnRef}>
        <FontAwesomeIcon className="mr-2" icon={faUpload} />
        <span>Import</span>
      </Button>

      {isOpen && (
        <ImportUsersDrawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        />
      )}
    </>
  );
}
