import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { Button, Tag } from '@chakra-ui/react';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../../shared/models/notify';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../../../../entities/activities/config/constants/request-activity-status.enum';

export type RequestsColumn = {
  id: number;
  author: {
    fullName: string;
  };
  requestType: string;
  dayOfWeek: string;
  timeOfDay: string;
  approvalStatus: RequestActivityStatus;
};

export function useRequestsColumns() {
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMemo(() => {
    const columnHelper = createColumnHelper<RequestsColumn>();

    return [
      columnHelper.accessor('author.fullName', {
        header: 'Requester'
      }),
      columnHelper.accessor('requestType', {
        header: 'Request type'
      }),
      columnHelper.accessor('dayOfWeek', {
        header: 'Day of week'
      }),
      columnHelper.accessor('timeOfDay', {
        header: 'Time of day'
      }),
      columnHelper.accessor('approvalStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          const valueMapToLabel = {
            [RequestActivityStatus.PENDING]: <Tag>Pending</Tag>,
            [RequestActivityStatus.APPROVED]: (
              <Tag colorScheme={'green'}>Approved</Tag>
            ),
            [RequestActivityStatus.REJECTED]: (
              <Tag colorScheme={'red'}>Rejected</Tag>
            )
          };
          const value = getValue();

          return <>{valueMapToLabel[value as RequestActivityStatus]}</>;
        }
      }),
      columnHelper.display({
        header: 'Actions',
        cell: ({ row }) => {
          const nextStateButton = {
            [RequestActivityStatus.PENDING]: [
              ApprovalRequestAction.APPROVE,
              ApprovalRequestAction.REJECT
            ],
            [RequestActivityStatus.APPROVED]: [ApprovalRequestAction.REVISE],
            [RequestActivityStatus.REJECTED]: [ApprovalRequestAction.REVISE]
          };
          const buttons = nextStateButton[
            row.original.approvalStatus
          ] as ApprovalRequestAction[];

          return (
            <div className={'flex gap-2'}>
              {buttons.includes(ApprovalRequestAction.APPROVE) && (
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
              {buttons.includes(ApprovalRequestAction.REJECT) && (
                <Button
                  colorScheme={'red'}
                  onClick={() => {
                    mutate(
                      {
                        id: row.original.id,
                        action: ApprovalRequestAction.REJECT
                      },
                      {
                        onSuccess: () => {
                          notify({
                            title: 'Success',
                            description: 'Request rejected',
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
                  Reject
                </Button>
              )}
              {buttons.includes(ApprovalRequestAction.REVISE) && (
                <Button
                  colorScheme={'purple'}
                  onClick={() => {
                    mutate(
                      {
                        id: row.original.id,
                        action: ApprovalRequestAction.REVISE
                      },
                      {
                        onSuccess: () => {
                          notify({
                            title: 'Success',
                            description: 'Request revised',
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
                  Revise
                </Button>
              )}
            </div>
          );
        }
      })
    ];
  }, [mutate, notify, queryClient]);
}
