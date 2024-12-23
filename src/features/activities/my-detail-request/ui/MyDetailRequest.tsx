import {
  useMyActivityRequestDetailQuery,
  useMyActivityStore
} from '../../../../entities/activities/models/activity-request.model';
import React from 'react';
import { MyDetailRequestDrawer } from './MyDetailRequestDrawer';
import { formatToInputDate } from '../../../../shared/models/utils/date.utils';

export function MyDetailRequest() {
  const selectedId = useMyActivityStore(state => state.selectedId);
  const setSelectedId = useMyActivityStore(state => state.setSelectedId);

  const { data } = useMyActivityRequestDetailQuery(selectedId);

  function handleClose() {
    setSelectedId(null);
  }

  if (!data) {
    return null;
  }

  return (
    <MyDetailRequestDrawer
      defaultValues={{
        requestType: data.requestType,
        timeOfDay: data.timeOfDay?.id,
        dayOfWeek: data.dayOfWeek?.id,
        reason: data.reason,
        requestChangeDay: data.requestChangeDay
          ? formatToInputDate(data.requestChangeDay)
          : undefined,
        compensatoryDay: data.compensatoryDay
          ? formatToInputDate(data.compensatoryDay)
          : undefined
      }}
      isOpen={selectedId !== null}
      onClose={handleClose}
      approvalStatus={data.approvalStatus}
      reviseNote={data.reviseNote}
      rejectReason={data.rejectReason}
      id={data.id}
    />
  );
}
