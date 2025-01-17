import * as React from 'react';
import { useMemo } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { createColumnHelper } from '@tanstack/table-core';
import { CommonCRUDProvider } from '../../widgets/crud-widget/CommonCRUDContext';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { CommonSearchWidget } from '../../widgets/crud-widget/CommonSearchWidget';
import { CommonViewEntityTable } from '../../widgets/crud-widget/CommonViewEntityTable';
import {
  activityLogApiClient,
  ActivityLogResponse
} from '../../entities/activities/api/activity-log-api.client';

export default function TrackingPage() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ActivityLogResponse>();

    return [
      columnHelper.accessor('fromTime', {
        header: 'From time'
      }),
      columnHelper.accessor('toTime', {
        header: 'To time'
      }),
      columnHelper.accessor('deviceUserId', {
        header: 'Device User Id'
      }),
      columnHelper.accessor('author.email', {
        header: 'Author email'
      })
    ];
  }, []);

  return (
    <CommonCRUDProvider
      resource={'tracking'}
      fetcher={activityLogApiClient.findLogs}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'Activity Logs Management'}
            brief={'Where you observe members logs'}
          />
        </ContentHeaderLayout>

        <CommonSearchWidget filterSlot={'Hello'} />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
