import * as React from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import {
  QuerySynchronizeSchema,
  useQuerySynchronizer
} from '../../shared/models/query-synchronizer';
import { SyncActivityLogsButton } from '../../features/activity-logs/sync-activity-logs/ui/SyncActivityLogsButton';
import { SearchActivityLogsContainer } from '../../features/activity-logs/search-activity-logs/ui/SearchActivityLogsContainer';
import { ActivityLogsTable } from '../../features/activity-logs/activity-logs-table/ActivityLogsTable';
import {
  ActivityLogsSearch,
  useActivityLogListStore
} from '../../entities/activities/models/activity-log.model';

const SyncActivityLogQuerySchema: QuerySynchronizeSchema<
  Partial<ActivityLogsSearch>
> = {
  fromDate: {
    target: 'fromDate',
    type: Date
  },
  toDate: {
    target: 'toDate',
    type: Date
  },
  workStatus: {
    target: 'workStatus',
    type: String,
    isArray: true
  }
};

export default function TrackingPage() {
  const submitValues = useActivityLogListStore(state => state.submitValues);

  useQuerySynchronizer({
    schema: SyncActivityLogQuerySchema,
    updater: submitValues
  });

  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Activity Logs Management'}
          brief={'Where you observe members logs'}
        />
        <HeaderActionGroup>
          <SyncActivityLogsButton />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <SearchActivityLogsContainer />
      <ActivityLogsTable />
    </Card>
  );
}
