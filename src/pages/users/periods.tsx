import React, { ReactElement, useMemo } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { CommonCreateEntityWidget } from '../../widgets/crud-widget/CommonCreateEntityDrawer';
import { CommonSearchWidget } from '../../widgets/crud-widget/CommonSearchWidget';
import { CommonViewEntityTable } from '../../widgets/crud-widget/CommonViewEntityTable';
import { CommonCRUDProvider } from '../../widgets/crud-widget/CommonCRUDContext';
import {
  CommonData,
  userMasterDataApiClient
} from '../../entities/user/api/user-master-data-api-client';
import { createColumnHelper } from '@tanstack/table-core';

export default function PeriodPage(): ReactElement {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<CommonData>();

    return [
      columnHelper.accessor('id', {
        header: 'id'
      }),
      columnHelper.accessor('name', {
        header: 'Name'
      }),
      columnHelper.accessor('description', {
        header: 'Description'
      })
    ];
  }, []);

  return (
    <CommonCRUDProvider
      resource={'period'}
      featureConfig={{
        enableInlineSearch: true
      }}
      fetcher={userMasterDataApiClient.getPeriods}
      mutation={userMasterDataApiClient.createPeriod}
      schema={{
        id: {
          label: 'Identifier',
          placeholder: 'Enter identifier which is should be 2 characters',
          type: 'text',
          required: true
        },
        name: {
          label: 'Name',
          placeholder: 'Enter period name',
          type: 'text',
          required: true
        },
        description: {
          label: 'Description',
          placeholder: 'Enter period description',
          type: 'textarea',
          required: false
        }
      }}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'User Period Management'}
            brief={'Where you manage our organization period'}
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
