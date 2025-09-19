import { Fragment, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@chakra-ui/react';
import {
  getRequestActions,
  useActivityRequestStore,
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
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
import {
  faCheck,
  faPencil,
  faRotateBack,
  faX
} from '@fortawesome/free-solid-svg-icons';

export type RequestsColumn = {
  id: number;
  author: {
    id: string;
    fullName: string;
    email: string;
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
  assignee: {
    id: string;
    fullName: string;
  };
  approver: {
    id: string;
    fullName: string;
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
  const notify = useNotify();
  const setApprovalModel = useMyActivityStore(state => state.setApprovalModel);

  return useMemo(() => {
    const columnHelper = createColumnHelper<RequestsColumn>();

    return [
      columnHelper.display({
        size: 24,
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
      columnHelper.accessor('requestType', {
        header: 'Request type',
        cell: props => {
          return <RequestTypeTag value={props.getValue() as RequestTypes} />;
        },
        size: 170
      }),
      columnHelper.accessor('author', {
        header: 'Requester',
        cell: ({ getValue, cell, column }) => {
          const author = getValue();

          return (
            <Fragment key={`${column.id}${cell.id}`}>
              <span>{author.fullName}</span>
              <p>{author.email}</p>
            </Fragment>
          );
        },
        size: 200
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
        },
        size: 200
      }),
      columnHelper.accessor('assignee.fullName', {
        header: 'Assignee',
        size: 160
      }),
      columnHelper.accessor('approver.fullName', {
        header: 'Approver',
        size: 160
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: props => formatDate(props.getValue()),
        size: 160
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Updated At',
        cell: props => formatDate(props.getValue()),
        size: 160
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
        size: 96,
        cell: ({ row }) => {
          const actions = getRequestActions(row.original.approvalStatus);

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
                      ids: [row.original.id],
                      action: ApprovalRequestAction.APPROVE
                    },
                    {
                      onSuccess: () => {
                        notify({
                          title: 'Success',
                          description: 'Request approved',
                          status: 'success'
                        });
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

          return (
            <div className={'gap-4 flex cursor-pointer'}>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => {
                  useActivityRequestStore.setState({
                    selectedId: row.original.id
                  });
                }}
              />
              <MoreActionCell renderActions={renderActions} />
            </div>
          );
        }
      })
    ];
  }, [mutate, notify, setApprovalModel]);
}
