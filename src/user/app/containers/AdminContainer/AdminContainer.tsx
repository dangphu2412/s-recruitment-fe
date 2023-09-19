import React, { PropsWithChildren } from 'react';
import { PaginationProvider } from '../../../../system/app/internal/pagination.provider';
import { ContentLayout } from '../../../../system/app/internal/components/Box';

export function AdminContainer({
  children
}: PropsWithChildren): React.ReactElement {
  return (
    <PaginationProvider>
      <ContentLayout>{children}</ContentLayout>
    </PaginationProvider>
  );
}
