import React from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ImportUsersDrawer } from './ImportUsersModal';
import { HeaderAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export function ImportUsersContainer(): React.ReactElement {
  return (
    <HeaderAction
      id={'import-users'}
      triggerButton={props => (
        <Button colorScheme="pink" {...props}>
          <FontAwesomeIcon className="mr-2" icon={faUpload} />
          <span>Import</span>
        </Button>
      )}
      content={ImportUsersDrawer}
    />
  );
}
