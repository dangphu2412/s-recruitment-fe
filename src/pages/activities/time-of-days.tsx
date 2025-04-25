import React, { ReactElement, useMemo } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { CommonCreateEntityWidget } from '../../widgets/crud-widget/CommonCreateEntityDrawer';
import { CommonSearchWidget } from '../../widgets/crud-widget/CommonSearchWidget';
import { CommonViewEntityTable } from '../../widgets/crud-widget/CommonViewEntityTable';
import { CommonCRUDProvider } from '../../widgets/crud-widget/CommonCRUDContext';
import { createColumnHelper } from '@tanstack/table-core';
import {
  TimeOfDay,
  timeOfDaysApiClient
} from '../../entities/activities/api/time-of-days-api.client';

export default function TimeOfDayPage(): ReactElement {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<TimeOfDay>();

    return [
      columnHelper.accessor('id', {
        header: 'id'
      }),
      columnHelper.accessor('name', {
        header: 'Name'
      }),
      columnHelper.accessor('fromTime', {
        header: 'From time',
        cell: ({ getValue }) => `${getValue()} UTC +0`
      }),
      columnHelper.accessor('toTime', {
        header: 'To time',
        cell: ({ getValue }) => `${getValue()} UTC +0`
      })
    ];
  }, []);

  return (
    <CommonCRUDProvider
      featureConfig={{
        enableInlineSearch: true
      }}
      resource={'time-of-days'}
      fetcher={timeOfDaysApiClient.get}
      mutation={timeOfDaysApiClient.createOne}
      schema={{
        id: {
          label: 'Identifier',
          placeholder: 'Enter identifier which is should be 2 characters',
          type: 'text',
          required: true
        },
        name: {
          label: 'Name',
          placeholder: 'Enter department name',
          type: 'text',
          required: true
        },
        fromTime: {
          label: 'From time',
          placeholder: 'Enter from time here',
          type: 'time',
          required: true
        },
        toTime: {
          label: 'To time',
          placeholder: 'Enter to time here',
          type: 'time',
          required: true
        }
      }}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'Time of day management'}
            brief={'Where you manage our organization time of day'}
          />

          <HeaderActionGroup>
            <CommonCreateEntityWidget />
          </HeaderActionGroup>
        </ContentHeaderLayout>

        <CommonSearchWidget />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
