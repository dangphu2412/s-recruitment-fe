import { ReactElement } from 'react';
import { Table } from '../../../../../system/app/internal/components/Table';
import { useRecruitmentColumns } from '../../../hooks/useRecruitmentColumns';
import { useRecruitmentEventItems } from '../../../hooks/useRecruitmentEventItems';
import { useRouter } from 'next/router';

export function RecruitmentEventTable(): ReactElement {
  const { push } = useRouter();
  const columns = useRecruitmentColumns();
  const items = useRecruitmentEventItems();

  return (
    <Table
      columns={columns}
      items={items}
      onRowClick={row => {
        push(`/recruitments/${row.original.id}`);
      }}
    />
  );
}
