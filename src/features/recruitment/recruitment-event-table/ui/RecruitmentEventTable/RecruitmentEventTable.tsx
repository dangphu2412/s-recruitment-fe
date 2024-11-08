import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Table } from '../../../../../shared/ui/Table';
import { useRecruitmentColumns, useRecruitmentEventItems } from '../../models';
import { useSearch } from '../../../../../shared/models/search-model';
import { Input } from '@chakra-ui/react';

export function RecruitmentEventTable(): ReactElement {
  const { push } = useRouter();
  const { search, setSearch } = useSearch();
  const columns = useRecruitmentColumns();
  const items = useRecruitmentEventItems({ search });

  return (
    <div className={'space-y-2'}>
      <Input
        placeholder={'Search by name, location ...'}
        onChange={e => setSearch(e.target.value)}
      />
      <Table
        // @ts-ignore
        columns={columns}
        items={items}
        onRowClick={row => {
          push(`/recruitments/${row.original.id}`);
        }}
        cellPropGetter={{
          className: 'whitespace-normal'
        }}
      />
    </div>
  );
}
