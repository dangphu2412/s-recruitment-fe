import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { Button, Tooltip } from '@chakra-ui/react';
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
import { RequestTypes } from '../../../../entities/activities/config/constants/request-activity-metadata.constant';
import { RequestTypeTag } from '../../../../entities/activities/ui/RequestTypeTag/RequestTypeTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotateBack, faX } from '@fortawesome/free-solid-svg-icons';
import { RequestDayText } from '../../../../entities/activities/ui/RequestDayText/RequestDayText';

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
  requestChangeDay?: string;
  compensatoryDay?: string;
  reason?: string;
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
        header: 'Request type',
        cell: props => {
          return <RequestTypeTag value={props.getValue() as RequestTypes} />;
        }
      }),
      columnHelper.display({
        header: 'Request day',
        cell: props => {
          return (
            <RequestDayText
              requestType={props.row.original.requestType}
              dayOfWeekName={props.row.original.dayOfWeek?.name}
              timeOfDayName={props.row.original.timeOfDay.name}
              requestChangeDay={props.row.original.requestChangeDay}
              compensatoryDay={props.row.original.compensatoryDay}
            />
          );
        }
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
                <Tooltip label="Approve">
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
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                </Tooltip>
              )}
              {actions.includes(ApprovalRequestAction.REJECT) && (
                <Tooltip label="Reject">
                  <Button
                    colorScheme={'red'}
                    onClick={() => {
                      setApprovalModel({
                        id: row.original.id,
                        action: ApprovalRequestAction.REJECT
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </Button>
                </Tooltip>
              )}
              {actions.includes(ApprovalRequestAction.REVISE) && (
                <Tooltip label="Revise">
                  <Button
                    colorScheme={'purple'}
                    onClick={() => {
                      setApprovalModel({
                        id: row.original.id,
                        action: ApprovalRequestAction.REVISE
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faRotateBack} />
                  </Button>
                </Tooltip>
              )}
            </div>
          );
        }
      })
    ];
  }, [mutate, notify, queryClient, setApprovalModel]);
}
