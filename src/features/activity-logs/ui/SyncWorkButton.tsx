import { Button } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { activityLogApiClient } from '../../../entities/activities/api/activity-log-api.client';
import { useNotify } from '../../../shared/models/notify';

export function SyncWorkButton() {
  const { mutate } = useMutation({
    mutationKey: 'sync-logs',
    mutationFn: activityLogApiClient.syncLogs
  });
  const notify = useNotify();

  function handleSyncLogs() {
    mutate(undefined, {
      onSuccess: () => {
        notify({
          title: 'Sync success',
          status: 'success'
        });
      },
      onError: () => {
        notify({
          title: 'Sync failed',
          status: 'error'
        });
      }
    });
  }

  return <Button onClick={handleSyncLogs}>Sync</Button>;
}
