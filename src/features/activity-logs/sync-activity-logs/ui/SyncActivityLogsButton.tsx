import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import {
  ACTIVITY_LOGS_QUERY_KEY,
  useMutateSyncLogs
} from '../../../../entities/activities/models/activity-log.model';
import { useNotify } from '../../../../shared/notify';
import { useTaskProgressStore } from '../../../../shared/progress-tasks-bar/progress-tasks-bar';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

const TASK_ID = 'activity-log-task';

export function SyncActivityLogsButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutateSyncLogs();
  const notify = useNotify();
  const startTask = useTaskProgressStore(state => state.startTask);
  const completeTask = useTaskProgressStore(state => state.completeTask);
  const failTask = useTaskProgressStore(state => state.failTask);

  return (
    <Button
      colorScheme="pink"
      onClick={() => {
        startTask({
          label: 'Synchronize Activity Logs',
          progress: 20,
          id: TASK_ID
        });
        mutate(undefined, {
          onSuccess: () => {
            notify({
              title: 'Synchronize Activity Logs',
              status: 'success'
            });
            completeTask(TASK_ID);
            queryClient.invalidateQueries([ACTIVITY_LOGS_QUERY_KEY]);
          },
          onError: () => {
            failTask(TASK_ID);
          }
        });
      }}
    >
      <FontAwesomeIcon className="mr-2" icon={faRotate} />
      Sync logs
    </Button>
  );
}
