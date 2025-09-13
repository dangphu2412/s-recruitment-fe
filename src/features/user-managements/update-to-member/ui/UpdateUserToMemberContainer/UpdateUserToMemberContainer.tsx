import React from 'react';
import { Button } from '@chakra-ui/react';
import { UpdateUserToMemberContainerDrawer } from './AddUserDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderDrawerAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { StepIds } from '../../../user-guide/user-management-guide';
import { useTranslate } from '../../../../../shared/translations/translation';

export function UpdateUserToMemberContainer(): React.ReactElement {
  const { formatMessage } = useTranslate();

  return (
    <HeaderDrawerAction
      id={StepIds.BTN_UPGRADE_USER}
      triggerButton={props => (
        <Button colorScheme="pink" {...props}>
          <FontAwesomeIcon className="mr-2" icon={faArrowUp} />
          <span>{formatMessage({ id: 'user.member' })}</span>
        </Button>
      )}
      content={UpdateUserToMemberContainerDrawer}
    />
  );
}
