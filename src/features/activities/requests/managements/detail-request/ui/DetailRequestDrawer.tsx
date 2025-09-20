import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { RequestTypes } from '../../../../../../entities/activities/config/constants/request-activity-metadata.constant';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../../../../../../entities/activities/config/constants/request-activity-status.enum';
import { ActivityStatusTag } from '../../../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import {
  getRequestActions,
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../../../entities/activities/models/activity-request.model';
import { useNotify } from '../../../../../../shared/notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../../../../entities/user/api';
import { TextView } from '../../../../../../shared/ui/Form/View/TextView';
import { formatDateTimeText } from '../../../../../../shared/date';

type ActivityRequestView = {
  id: number;
  requestType: string;
  timeOfDay: {
    id: string;
    name: string;
  };
  dayOfWeek: {
    id: string;
    name: string;
  };
  assignee: {
    id: string;
    fullName: string;
    email: string;
  };
  approver: {
    id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  approvalStatus: RequestActivityStatus;
  rejectReason: string;
  reviseNote: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
  reason?: string;
  author: User;
};

type MyDetailRequestDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  data: ActivityRequestView;
};

export function DetailRequestDrawer({
  data,
  isOpen,
  onClose,
  id
}: Readonly<MyDetailRequestDrawerProps>) {
  const notify = useNotify();
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const setApprovalModel = useMyActivityStore(state => state.setApprovalModel);

  function renderActions() {
    if (
      [RequestActivityStatus.APPROVED, RequestActivityStatus.REJECTED].includes(
        data.approvalStatus
      )
    ) {
      return;
    }

    const actions = getRequestActions(data.approvalStatus);

    return (
      <div className={'flex justify-between w-full'}>
        <div className={'space-x-2'}>
          {actions.includes(ApprovalRequestAction.REVISE) && (
            <Button
              className={'space-x-2'}
              colorScheme={'cyan'}
              onClick={() => {
                setApprovalModel({
                  id: id,
                  action: ApprovalRequestAction.REVISE
                });
              }}
            >
              <FontAwesomeIcon icon={faX} />
              <span>Revise</span>
            </Button>
          )}
          {actions.includes(ApprovalRequestAction.REJECT) && (
            <Button
              className={'space-x-2'}
              colorScheme={'red'}
              onClick={() => {
                setApprovalModel({
                  id: id,
                  action: ApprovalRequestAction.REJECT
                });
              }}
            >
              <FontAwesomeIcon icon={faX} />
              <span>Reject</span>
            </Button>
          )}
        </div>

        {actions.includes(ApprovalRequestAction.APPROVE) && (
          <Button
            className={'space-x-2'}
            colorScheme={'green'}
            onClick={() => {
              mutate(
                {
                  ids: [id],
                  action: ApprovalRequestAction.APPROVE
                },
                {
                  onSuccess: () => {
                    notify({
                      title: 'Success',
                      description: 'Request approved',
                      status: 'success'
                    });
                    onClose();
                  }
                }
              );
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
            <span>Approve</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <Drawer isOpen={isOpen} placement="right" size={'md'} onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <div className={'flex items-center space-x-2'}>
            <span>Request detail</span>
            <ActivityStatusTag value={data.approvalStatus} />
          </div>

          <Text fontSize={'sm'} fontWeight={'light'}>
            REQ-{id}
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <div className="gap-x-2 gap-y-4 grid grid-cols-2">
            <TextView label={'Request Type'} value={data.requestType} />
            <TextView label={'Requester'} value={data.author.fullName} />

            <TextView
              label={'Created At'}
              value={formatDateTimeText(data.createdAt)}
            />

            <TextView label={'Time of Day'} value={data.timeOfDay.name} />

            {[RequestTypes.ABSENCE, RequestTypes.LATE].includes(
              data.requestType as RequestTypes
            ) && (
              <TextView
                label={
                  {
                    [RequestTypes.ABSENCE]: 'Absense Day',
                    [RequestTypes.LATE]: 'Late Day'
                  }[data.requestType] as string
                }
                value={formatDateTimeText(data.requestChangeDay as string)}
              />
            )}

            {RequestTypes.ABSENCE === data.requestType && (
              <TextView
                label={'Compensatory Day'}
                value={formatDateTimeText(data.compensatoryDay)}
              />
            )}

            {[RequestTypes.ABSENCE, RequestTypes.LATE].includes(
              data.requestType as RequestTypes
            ) && (
              <TextView
                className={'col-span-2'}
                label={'Request Reason Description'}
                value={data.reason}
              />
            )}

            {RequestActivityStatus.REVISE === data.approvalStatus &&
              data.reviseNote && (
                <TextView
                  className={'col-span-2'}
                  label={'Reviewer Revise Note'}
                  value={data.reviseNote}
                />
              )}

            {RequestActivityStatus.REJECTED === data.approvalStatus &&
              data.rejectReason && (
                <TextView
                  className={'col-span-2'}
                  label={'Reviewer Reject Reason'}
                  value={data.rejectReason}
                />
              )}

            <TextView
              label={'Assignee'}
              value={
                data.assignee ? (
                  <>
                    <p>{data.assignee?.fullName}</p>
                    <p>{data.assignee?.email}</p>
                  </>
                ) : (
                  'No information'
                )
              }
            />

            <TextView
              label={'Approver'}
              value={
                data.approver ? (
                  <>
                    <p>{data.approver?.fullName}</p>
                    <p>{data.approver?.email}</p>
                  </>
                ) : (
                  'No information'
                )
              }
            />
          </div>
        </DrawerBody>

        <DrawerFooter>
          <>{renderActions()}</>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
