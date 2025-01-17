import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@chakra-ui/react';
import React, { ChangeEvent, useRef } from 'react';
import { useMutateUploadLogs } from '../../../../../entities/activities/models/activity.model';
import { useNotify } from '../../../../../shared/models/notify';

export function UploadActivitiesButton() {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useMutateUploadLogs();
  const notify = useNotify();

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      mutate(file, {
        onSuccess: () => {
          notify({
            title: 'Upload activities success',
            status: 'success'
          });
        },
        onError: () => {
          notify({
            title: 'Upload logs failed',
            status: 'error'
          });
        }
      });
    }
  }

  return (
    <Button colorScheme="pink" onClick={() => ref.current?.click()}>
      <input type="file" ref={ref} hidden onChange={handleUpload} />
      <FontAwesomeIcon className="mr-2" icon={faUpload} />
      <span>Track activity</span>
    </Button>
  );
}
