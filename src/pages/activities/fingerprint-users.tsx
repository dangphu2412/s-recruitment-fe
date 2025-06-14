import * as React from 'react';
import { useMemo } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { createColumnHelper } from '@tanstack/table-core';
import { CommonCRUDProvider } from '../../widgets/crud-widget/CommonCRUDContext';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { CommonViewEntityTable } from '../../widgets/crud-widget/CommonViewEntityTable';
import {
  activityMdmApiClient,
  TrackedUsers
} from '../../entities/activities/api/activity-mdm-api.client';
import { CommonSearchWidget } from '../../widgets/crud-widget/CommonSearchWidget';

export default function FingerprintUsersPage() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<TrackedUsers>();

    return [
      columnHelper.accessor('trackingId', {
        header: 'Fingerprint ID'
      }),
      columnHelper.accessor('name', {
        header: 'Name'
      })
    ];
  }, []);

  return (
    <CommonCRUDProvider
      resource={'tracking'}
      fetcher={activityMdmApiClient.getUsers}
      featureConfig={{ enableInlineSearch: true }}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'Fingerprint Users Management'}
            brief={'Where you observe fingerprint users'}
          />
        </ContentHeaderLayout>

        <CommonSearchWidget />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
