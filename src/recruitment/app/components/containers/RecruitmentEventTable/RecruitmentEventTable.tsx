import { ReactElement } from 'react';
import { Table } from '../../../../../system/app/internal/components/Table';
import { useRecruitmentColumns } from '../../../hooks/useRecruitmentColumns';
import { useRecruitmentEventItems } from '../../../hooks/useRecruitmentEventItems';

export function RecruitmentEventTable(): ReactElement {
  const columns = useRecruitmentColumns();
  const items = useRecruitmentEventItems();

  return <Table columns={columns} items={items} />;
}
