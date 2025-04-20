import React from 'react';
import { Button } from '@chakra-ui/react';
import { UpdateUserToMemberContainerDrawer } from './AddUserDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderDrawerAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { StepIds } from '../../../user-guide/user-management-guide';

export function UpdateUserToMemberContainer(): React.ReactElement {
  return (
    <HeaderDrawerAction
      id={StepIds.BTN_UPGRADE_USER}
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
