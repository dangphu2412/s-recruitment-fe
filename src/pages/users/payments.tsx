import * as React from 'react';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { CommonCRUDProvider } from '../../widgets/crud-widget/CommonCRUDContext';
import { Card, ContentHeader } from '../../shared/ui';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { CommonSearchWidget } from '../../widgets/crud-widget/CommonSearchWidget';
import { CommonViewEntityTable } from '../../widgets/crud-widget/CommonViewEntityTable';
import {
  Payment,
  paymentsApiClient
} from '../../entities/monthly-money/api/payments-api.client';

export default function PaymentPage() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Payment>();

    return [
      columnHelper.accessor('paidAt', {
        header: 'Paid At',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString()
      }),
      columnHelper.accessor('amount', {
        header: 'Amount'
      }),
      columnHelper.accessor('note', {
        header: 'Note'
      })
    ];
  }, []);

  return (
    <CommonCRUDProvider
      resource={'payments'}
      fetcher={paymentsApiClient.getMyPayments}
      featureConfig={{ enableInlineSearch: true }}
    >
      <Card>
        <ContentHeaderLayout>
          <ContentHeader
            main={'My payments'}
            brief={'Where you observe your payments information'}
          />
        </ContentHeaderLayout>

        <CommonSearchWidget />
        <CommonViewEntityTable columns={columns} />
      </Card>
    </CommonCRUDProvider>
  );
}
