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
import { DateRangeFilter } from '../../features/activity-logs/ui/DateRangeFilter';
import { endOfDay, subWeeks } from 'date-fns';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { UploadFileButtonWidget } from '../../widgets/upload-file/UploadFileButtonWidget';
import { formatDateTime } from '../../shared/models/utils/date.utils';
import { Tag } from '@chakra-ui/react';
import { LogWorkStatus } from '../../entities/activities/config/constants/log-work-status.enum';
import { StatusFilterDialog } from '../../features/activity-logs/ui/LogWorkStatusFilter';

function plugin() {
  return {
    values: {
      fromDate: subWeeks(new Date(), 1),
      toDate: endOfDay(new Date())
    }
  };
}

export default function TrackingPage() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ActivityLogResponse>();

    return [
      columnHelper.display({
        header: 'Log status',
        cell: props => {
          if (props.row.original.workStatus === LogWorkStatus.LATE) {
            return <Tag colorScheme={'red'}>Late</Tag>;
          }

          if (props.row.original.workStatus === LogWorkStatus.NOT_FINISHED) {
            return <Tag colorScheme={'yellow'}>Not checkout</Tag>;
          }

          return <Tag colorScheme={'green'}>On time</Tag>;
        }
      }),
      columnHelper.accessor('fromTime', {
        header: 'From time',
        cell: ({ getValue }) => formatDateTime(getValue())
      }),
      columnHelper.accessor('toTime', {
        header: 'To time',
        cell: ({ getValue }) => formatDateTime(getValue())
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
      registerPlugin={plugin}
      featureConfig={{ enableInlineSearch: true }}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'Activity Logs Management'}
            brief={'Where you observe members logs'}
          />
          <HeaderActionGroup>
            <UploadFileButtonWidget
              resource={'upload-logs'}
              mutateFn={activityLogApiClient.uploadLogs}
            >
              Upload logs
            </UploadFileButtonWidget>
          </HeaderActionGroup>
        </ContentHeaderLayout>

        <CommonSearchWidget
          filterSlot={
            <>
              <DateRangeFilter />
              <StatusFilterDialog />
            </>
          }
        />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
