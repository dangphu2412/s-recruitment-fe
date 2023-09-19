import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddUserDrawer } from 'src/user/app/components/AdminTable/TableHeader/AddUserDrawer';

export function HeaderActions(): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  return (
    <>
      <Button ref={addNewUserButtonRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add
      </Button>

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
