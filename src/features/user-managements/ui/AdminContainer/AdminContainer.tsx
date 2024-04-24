import React, { PropsWithChildren } from 'react';
import { PaginationProvider } from '../../../../shared/models/pagination/pagination.provider';
import { ContentLayout } from '../../../../shared/ui/Box';

export function AdminContainer({
  children
}: PropsWithChildren): React.ReactElement {
  return (
    <PaginationProvider>
      <ContentLayout>{children}</ContentLayout>
    </PaginationProvider>
  );
}
