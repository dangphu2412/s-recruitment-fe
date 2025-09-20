import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useMutateDownloadReport } from '../../../../entities/activities/models/activity-log.model';
import { useNotify } from '../../../../shared/notify';
import { useTaskProgressStore } from '../../../../shared/progress-tasks-bar/progress-tasks-bar';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const TASK_ID = 'download-report-task';

export function DownloadLogsReportButton() {
  const { mutate } = useMutateDownloadReport();
  const notify = useNotify();
  const startTask = useTaskProgressStore(state => state.startTask);
  const completeTask = useTaskProgressStore(state => state.completeTask);
  const failTask = useTaskProgressStore(state => state.failTask);

  return (
    <Button
      colorScheme="pink"
      onClick={() => {
        startTask({
          label: 'Download Report',
          progress: 20,
          id: TASK_ID
        });
        mutate(undefined, {
          onSuccess: () => {
            notify({
              title: 'Download report successfully',
              status: 'success'
            });
            completeTask(TASK_ID);
          },
          onError: () => {
            failTask(TASK_ID);
          }
        });
      }}
    >
      <FontAwesomeIcon className="mr-2" icon={faDownload} />
      Download Late Report
    </Button>
  );
}
