import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { UpdateUserToMemberContainerDrawer } from './AddUserDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export function UpdateUserToMemberContainer(): React.ReactElement {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'UpdateUserToMemberContainer'
  });

  return (
    <>
      <Button colorScheme="pink" ref={btnRef} onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faArrowUp} />
        <span>Member</span>
      </Button>

      {isOpen && (
        <UpdateUserToMemberContainerDrawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        />
      )}
    </>
  );
}
