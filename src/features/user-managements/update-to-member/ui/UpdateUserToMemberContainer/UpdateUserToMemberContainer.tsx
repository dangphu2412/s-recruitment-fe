import React from 'react';
import { Button } from '@chakra-ui/react';
import { UpdateUserToMemberContainerDrawer } from './AddUserDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderDrawerAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export function UpdateUserToMemberContainer(): React.ReactElement {
  return (
    <HeaderDrawerAction
      id={'update-user-to-member'}
      triggerButton={props => (
        <Button colorScheme="pink" {...props}>
          <FontAwesomeIcon className="mr-2" icon={faArrowUp} />
          <span>Member</span>
        </Button>
      )}
      content={UpdateUserToMemberContainerDrawer}
    />
  );
}
