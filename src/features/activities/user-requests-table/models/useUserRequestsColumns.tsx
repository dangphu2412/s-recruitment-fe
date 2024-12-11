import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { Button } from '@chakra-ui/react';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../../shared/models/notify';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';

export type RequestsColumn = {
  id: number;
  author: {
    fullName: string;
  };
  requestType: string;
  dayOfWeek: {
    id: string;
    name: string;
  };
  timeOfDay: {
    id: string;
    name: string;
  };
  createdAt: string;
  approvalStatus: RequestActivityStatus;
};

export function useUserRequestsColumns() {
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const queryClient = useQueryClient();
  const notify = useNotify();
  const setApprovalModel = useMyActivityStore(state => state.setApprovalModel);

  return useMemo(() => {
    const columnHelper = createColumnHelper<RequestsColumn>();

    return [
      columnHelper.accessor('author.fullName', {
        header: 'Requester'
      }),
      columnHelper.accessor('requestType', {
        header: 'Request type'
      }),
      columnHelper.accessor('dayOfWeek.name', {
        header: 'Day of week'
      }),
      columnHelper.accessor('timeOfDay.name', {
        header: 'Time of day'
      }),
      columnHelper.accessor('createdAt', {
        header: 'Submitted at',
        cell: props => <>{formatDate(new Date(props.getValue()))}</>
      }),
      columnHelper.accessor('approvalStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          return <ActivityStatusTag value={getValue()} />;
        }
      }),
      columnHelper.display({
        header: 'Actions',
        cell: ({ row }) => {
          const nextStateButton: Record<
            RequestActivityStatus,
            ApprovalRequestAction[]
          > = {
            [RequestActivityStatus.PENDING]: [
              ApprovalRequestAction.APPROVE,
              ApprovalRequestAction.REJECT,
              ApprovalRequestAction.REVISE
            ],
            [RequestActivityStatus.APPROVED]: [],
            [RequestActivityStatus.REJECTED]: [ApprovalRequestAction.REVISE],
            [RequestActivityStatus.REVISE]: []
          };
          const actions = nextStateButton[row.original.approvalStatus];

          return (
            <div className={'flex gap-2'}>
              {actions.includes(ApprovalRequestAction.APPROVE) && (
                <Button
                  colorScheme={'green'}
                  onClick={() => {
                    mutate(
                      {
                        id: row.original.id,
                        action: ApprovalRequestAction.APPROVE
                      },
                      {
                        onSuccess: () => {
                          notify({
                            title: 'Success',
                            description: 'Request approved',
                            status: 'success'
                          });
                          queryClient.invalidateQueries(
                            ACTIVITY_REQUESTS_QUERY_KEY
                          );
                        }
                      }
                    );
                  }}
                >
                  Approve
                </Button>
              )}
              {actions.includes(ApprovalRequestAction.REJECT) && (
                <Button
                  colorScheme={'red'}
                  onClick={() => {
                    setApprovalModel({
                      id: row.original.id,
                      action: ApprovalRequestAction.REJECT
                    });
                  }}
                >
                  Reject
                </Button>
              )}
              {actions.includes(ApprovalRequestAction.REVISE) && (
                <Button
                  colorScheme={'purple'}
                  onClick={() => {
                    setApprovalModel({
                      id: row.original.id,
                      action: ApprovalRequestAction.REVISE
                    });
                  }}
                >
                  Revise
                </Button>
              )}
            </div>
          );
        }
      })
    ];
  }, [mutate, notify, queryClient, setApprovalModel]);
}
