import React from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useDownloadEmployeesMutation } from '../../../../entities/recruitment/models';
import { useNotify } from '../../../../shared/models/notify';
import { downloadFile } from '../../../../shared/models/file';

type Props = {
  eventId: number;
};

export function DownloadEmployeesButton({
  eventId
}: Props): React.ReactElement {
  const { downloadEmployees } = useDownloadEmployeesMutation();
  const notify = useNotify();

  function handleDownload() {
    downloadEmployees(
      { eventId },
      {
        onSuccess: response => {
          downloadFile(response, 'employees.xlsx');
          notify({
            title: 'Download success',
            status: 'success'
          });
        }
      }
    );
  }

  return (
    <Button
      leftIcon={<FontAwesomeIcon icon={faDownload} />}
      onClick={handleDownload}
    >
      Download Employees
    </Button>
  );
}
