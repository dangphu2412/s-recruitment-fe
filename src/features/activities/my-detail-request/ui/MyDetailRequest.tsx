import {
  useMyActivityRequestDetailQuery,
  useMyActivityStore
} from '../../../../entities/activities/models/activity-request.model';
import React from 'react';
import { MyDetailRequestDrawer } from './MyDetailRequestDrawer';

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
        dayOfWeek: data.dayOfWeek?.id
      }}
      requestType={data.requestType}
      isOpen={selectedId !== null}
      onClose={handleClose}
      approvalStatus={data.approvalStatus}
      reviseNote={data.reviseNote}
      rejectReason={data.rejectReason}
      id={data.id}
    />
  );
}
