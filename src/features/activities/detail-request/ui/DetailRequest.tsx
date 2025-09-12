import {
  useActivityRequestDetailQuery,
  useActivityRequestStore
} from '../../../../entities/activities/models/activity-request.model';
import React from 'react';
import { DetailRequestDrawer } from './DetailRequestDrawer';

export function DetailRequest() {
  const selectedId = useActivityRequestStore(state => state.selectedId);

  const { data } = useActivityRequestDetailQuery(selectedId);

  function handleClose() {
    useActivityRequestStore.setState({
      selectedId: null
    });
  }

  if (!data) {
    return null;
  }

  return (
    <DetailRequestDrawer
      data={data}
      isOpen={selectedId !== null}
      onClose={handleClose}
      id={data.id}
    />
  );
}
