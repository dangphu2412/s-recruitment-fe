import * as React from 'react';
import { useMemo } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { createColumnHelper } from '@tanstack/table-core';
import {
  CommonCRUDProvider,
  useCommonCRUDContext
} from '../../widgets/crud-widget/CommonCRUDContext';
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
import { formatDayOfWeekAndDate } from '../../shared/models/utils/date.utils';
import { Button, Tag, useToast } from '@chakra-ui/react';
import { LogWorkStatus } from '../../entities/activities/config/constants/log-work-status.enum';
import { StatusFilterDialog } from '../../features/activity-logs/ui/LogWorkStatusFilter';
import { UserFilter } from '../../features/activity-logs/ui/UserFilter';
import {
  QuerySynchronizeSchema,
  useQuerySynchronizer
} from '../../shared/models/query-synchronizer';
import { useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useMutateSyncLogs } from '../../entities/activities/models/activity-log.model';

function plugin() {
  return {
    values: {
      fromDate: subWeeks(new Date(), 1),
      toDate: endOfDay(new Date()),
      authors: []
    }
  };
}

const SyncActivityLogQuerySchema: QuerySynchronizeSchema<{
  fromDate: string;
  toDate: string;
  authors: string[];
  workStatus: string[];
}> = {
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

function QuerySynchronizer() {
  const submitValues = useCommonCRUDContext(state => state.submitValues);

  useQuerySynchronizer({
    schema: SyncActivityLogQuerySchema,
    updater: submitValues
  });

  return <></>;
}

export default function TrackingPage() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutateSyncLogs();

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
      columnHelper.accessor('author.email', {
        header: 'Author email',
        cell: props => {
          const value = props.getValue();

          if (!value) {
            return <Tag colorScheme={'gray'}>Not Linked</Tag>;
          }

          return <span>{value}</span>;
        }
      }),
      columnHelper.accessor('deviceAuthor.name', {
        header: 'Device User'
      }),
      columnHelper.accessor('fromTime', {
        header: 'From time',
        cell: ({ getValue }) => formatDayOfWeekAndDate(getValue())
      }),
      columnHelper.accessor('toTime', {
        header: 'To time',
        cell: ({ getValue }) => formatDayOfWeekAndDate(getValue())
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
      <QuerySynchronizer />
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'Activity Logs Management'}
            brief={'Where you observe members logs'}
          />
          <HeaderActionGroup>
            <Button
              colorScheme="pink"
              onClick={() => {
                mutate(undefined, {
                  onSuccess: () => {
                    toast({
                      title: 'Synchorinized successfully',
                      status: 'success'
                    });
                    queryClient.invalidateQueries(['upload-logs']);
                  }
                });
              }}
            >
              <FontAwesomeIcon className="mr-2" icon={faRotate} />
              Sync logs
            </Button>
          </HeaderActionGroup>
        </ContentHeaderLayout>

        <CommonSearchWidget
          filterSlot={
            <>
              <DateRangeFilter />
              <StatusFilterDialog />
              <UserFilter />
            </>
          }
        />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
