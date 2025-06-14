import React from 'react';
import { StepIds } from '../../../user-guide/user-management-guide';
import { QUERY_USERS_KEY } from '../../../../../entities/user/models';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';
import { UploadFileButtonWidget } from '../../../../../widgets/upload-file/UploadFileButtonWidget';
import { userApiClient } from '../../../../../entities/user/api';

export function ImportUsersContainer(): React.ReactElement {
  const notify = useNotify();
  const queryClient = useQueryClient();

  function renderDescription() {
    return (
      <>
        <p>
          Only <b>.xlsx</b> files are supported
        </p>
        <p>The file must contain exactly one sheet</p>
        <p>
          The sheet must follow the specified{' '}
          <a
            className={'underline'}
            target="_blank"
            rel="noopener noreferrer"
            href={
              'https://docs.google.com/spreadsheets/d/1BKP_j8S6h8Ht7HwQ3pnhDqUFZNDMtNDTpKqhPiAxFNg/edit?gid=1940829542#gid=1940829542'
            }
          >
            format
          </a>
        </p>
      </>
    );
  }

  return (
    <UploadFileButtonWidget
      id={StepIds.BTN_IMPORT_USER}
      title={'Upload Users'}
      description={renderDescription()}
      resource={'upload-users'}
      accept={'.xlsx'}
      mutateFn={userApiClient.uploadUserByFile}
      onSuccess={response => {
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
      }}
      onError={() => {
        notify({
          title:
            'Files larger than 50KB or containing multiple sheets are not allowed.',
          status: 'error'
        });
      }}
    >
      Upload Users
    </UploadFileButtonWidget>
  );
}
