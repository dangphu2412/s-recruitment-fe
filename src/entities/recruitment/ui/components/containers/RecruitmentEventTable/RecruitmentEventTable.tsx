import { ReactElement } from 'react';
import { useRecruitmentColumns } from '../../../hooks/useRecruitmentColumns';
import { useRecruitmentEventItems } from '../../../hooks/useRecruitmentEventItems';
import { useRouter } from 'next/router';
import { Table } from '../../../../../../shared/ui/Table';

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
