import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddNewEventDrawer } from './AddNewEventDrawer/AddNewEventDrawer';

export function RecruitmentActionContainer(): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button ref={addNewUserButtonRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add
      </Button>

      {isOpen && (
        <AddNewEventDrawer
          isOpen={isOpen}
          isLoading={false}
          onClose={onClose}
          finalFocusRef={addNewUserButtonRef}
        />
      )}
    </>
  );
}
