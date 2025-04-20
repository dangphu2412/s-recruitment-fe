import React from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { HeaderModalAction } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { StepIds } from '../../../user-guide/user-management-guide';
import { UploadModal } from '../../../../../shared/ui/Header/ContentHeader/UploadModal';
import {
  QUERY_USERS_KEY,
  useMutateUploadUserByFile
} from '../../../../../entities/user/models';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';

export function ImportUsersContainer(): React.ReactElement {
  const { uploadUserByFile } = useMutateUploadUserByFile();
  const notify = useNotify();
  const queryClient = useQueryClient();

  const importUsers = (file: File | undefined | null, onClose?: () => void) => {
    if (!file) {
      return;
    }

    uploadUserByFile(
      {
        file: file
      },
      {
        onSuccess: response => {
          if (
            Array.isArray(response) &&
            response.length > 0 &&
            response?.[0]?.duplicatedEmails?.length
          ) {
            const dupEmails = response
              .map(user => user.duplicatedEmails)
              .flat()
              .join(', ');
            notify({
              title: 'Duplicated Emails',
              status: 'warning',
              description: `Please remove emails: ${dupEmails}`,
              duration: null
            });
            return;
          }
          notify({
            title: 'Import successfully',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_USERS_KEY]
          });
          onClose?.();
        },
        onError: () => {
          notify({
            title: 'Import got incorrect column definition',
            status: 'error'
          });
        }
      }
    );
  };
  return (
    <HeaderModalAction
      id={StepIds.BTN_IMPORT_USER}
      triggerButton={props => (
        <Button colorScheme="pink" {...props}>
          <FontAwesomeIcon className="mr-2" icon={faUpload} />
          <span>Import</span>
        </Button>
      )}
      content={props => (
        <UploadModal {...props} title={'Upload users'} onSave={importUsers} />
      )}
    />
  );
}
