import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@chakra-ui/react';
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
import { RequestDayText } from '../../../../entities/activities/ui/RequestDayText/RequestDayText';
import { MoreActionCell } from '../../../../shared/ui/Table/Cell/MoreActionCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faRotateBack } from '@fortawesome/free-solid-svg-icons';

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
  updatedAt: string;
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
      columnHelper.display({
        id: 'select',
        header: ({ table }) => {
          return (
            <Checkbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={
                table.getIsSomeRowsSelected()
                  ? () => table.setRowSelection(() => ({}))
                  : table.getToggleAllRowsSelectedHandler()
              }
            />
          );
        },
        cell: ({ row }) => {
          return (
            <Checkbox
              isChecked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          );
        },
        enableSorting: false
      }),
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
      columnHelper.accessor('updatedAt', {
        header: 'Last changed at',
        cell: props => formatDate(props.getValue())
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created at',
        cell: props => formatDate(props.getValue())
      }),
      columnHelper.accessor('approvalStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          return <ActivityStatusTag value={getValue()} />;
        }
      }),
      columnHelper.display({
        id: 'Actions',
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

          function renderActions() {
            const btnActions = [];
            if (actions.includes(ApprovalRequestAction.APPROVE)) {
              btnActions.push({
                key: 'approve',
                content: (
                  <p className={'space-x-2'}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Approve</span>
                  </p>
                ),
                onClick: () => {
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
                }
              });
            }

            if (actions.includes(ApprovalRequestAction.REJECT)) {
              btnActions.push({
                key: 'reject',
                content: (
                  <p className={'space-x-2'}>
                    <FontAwesomeIcon icon={faX} />
                    <span>Reject</span>
                  </p>
                ),
                onClick: () => {
                  setApprovalModel({
                    id: row.original.id,
                    action: ApprovalRequestAction.REJECT
                  });
                }
              });
            }

            if (actions.includes(ApprovalRequestAction.REVISE)) {
              btnActions.push({
                key: 'revise',
                content: (
                  <p className={'space-x-2'}>
                    <FontAwesomeIcon icon={faRotateBack} />
                    <span>Revise</span>
                  </p>
                ),
                onClick: () => {
                  setApprovalModel({
                    id: row.original.id,
                    action: ApprovalRequestAction.REVISE
                  });
                }
              });
            }

            return btnActions;
          }

          return <MoreActionCell renderActions={renderActions} />;
        }
      })
    ];
  }, [mutate, notify, queryClient, setApprovalModel]);
}
