import { Card, ContentHeader } from '../../../shared/ui';
import { ContentHeaderLayout } from '../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import React from 'react';
import { RequestsTable } from '../../../features/activities/requests-table/ui/RequestsTable/RequestsTable';

export default function RequestsPage() {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Requests'}
          brief={'Where you manage member requests'}
        />
      </ContentHeaderLayout>

      <RequestsTable />
    </Card>
  );
}
