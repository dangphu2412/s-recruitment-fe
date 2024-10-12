import React, { ChangeEvent, useRef } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  QUERY_USERS_KEY,
  useMutateUploadUserByFile
} from '../../../../../entities/user/models';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';

export function ImportUsersContainer(): React.ReactElement {
  const ref = useRef<HTMLInputElement>(null);
  const { uploadUserByFile } = useMutateUploadUserByFile();
  const notify = useNotify();
  const queryClient = useQueryClient();

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    uploadUserByFile(
      {
        file,
        fieldMappings: JSON.stringify({
          'Họ và Tên:': 'fullName',
          Email: 'email',
          Username: 'username'
        })
      },
      {
        onSuccess: () => {
          notify({
            title: 'Import successfully',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_USERS_KEY]
          });
        },
        onError: () => {
          notify({
            title: 'Import failed',
            description: 'Format should be: Họ và Tên, Email, Username',
            status: 'error'
          });
        }
      }
    );
  }

  return (
    <>
      <Button colorScheme="pink" onClick={() => ref?.current?.click()}>
        <FontAwesomeIcon className="mr-2" icon={faUpload} />
        <span>Import</span>
      </Button>

      <Input type={'file'} hidden ref={ref} onChange={handleImport} />
    </>
  );
}
