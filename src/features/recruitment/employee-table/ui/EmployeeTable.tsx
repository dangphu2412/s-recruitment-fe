import { Input, Text } from '@chakra-ui/react';
import { Table } from '../../../../shared/ui';
import React, { useMemo } from 'react';
import { Employee } from '../../../../entities/recruitment/api/recruitment.usecase';
import {
  EmployeeColumnView,
  mapToEmployeeTable,
  useEmployeeColumns
} from '../models/employee-table.model';
import { useSearch } from '../../../../shared/models/search-model';
import { EmployeeFilter } from './EmployeeFilter';
import { RefreshButton } from '../../../../shared/ui/Button/RefreshButton';
import { useQueryClient } from 'react-query';
import { RECRUITMENT_EVENT_DETAIL_QUERY_KEY } from '../../../../entities/recruitment/models';
import { useEventDetailStore } from '../../../../entities/recruitment/models/event-detail.store';
import { Paginator } from '../../../../shared/ui/Pagination/Paginator';
import classes from './EmployeeTable.module.scss';
import { DEFAULT_PAGINATION, paginator } from '../../../../shared/models';

type EmployeeTableProps = {
  employees: Employee[];
  passPoint: number;
  onSelect: (employee: EmployeeColumnView) => void;
};

export function EmployeeTable({
  employees,
  passPoint,
  onSelect
}: EmployeeTableProps) {
  const page = useEventDetailStore(state => state.page);
  const size = useEventDetailStore(state => state.size);
  const setValues = useEventDetailStore(state => state.setValues);

  const { search, setSearch } = useSearch();
  const columns = useEmployeeColumns({ employees, passPoint });
  const employeeItems = useMemo(() => {
    return mapToEmployeeTable({
      employees,
      searchValue: search
    });
  }, [employees, search]);
  const paginatedItems = useMemo(() => {
    return paginator(employeeItems, { page, size });
  }, [employeeItems, page, size]);
  const queryClient = useQueryClient();
  const totalRecords = employeeItems.length;

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [RECRUITMENT_EVENT_DETAIL_QUERY_KEY]
    });
  }

  function handleSearch(value: string) {
    setSearch(value);
    setValues({
      page: DEFAULT_PAGINATION.page
    });
  }

  return (
    <div className={'space-y-3'}>
      <Text fontSize={'md'} fontWeight={'medium'}>
        Employee information
      </Text>

      <div className={'space-y-2'}>
        <div className={'flex gap-2'}>
          <Input
            placeholder={'Search employee ...'}
            onChange={e => handleSearch(e.target.value)}
          />

          <EmployeeFilter />
        </div>

        <div className={'flex justify-between items-center'}>
          <div className={'flex items-center gap-2'}>
            <RefreshButton onClick={refresh} />
            <Paginator
              className="py-2"
              totalRecords={totalRecords}
              page={page}
              size={size}
              onPageChange={page => setValues({ page })}
              onSizeChange={size => setValues({ size })}
            />
          </div>

          <Text fontSize={'sm'} fontWeight={'medium'}>
            Total: {totalRecords} users
          </Text>
        </div>
      </div>

      <Table
        caption={'Employee information'}
        // @ts-ignore
        columns={columns}
        items={paginatedItems}
        onRowClick={row => onSelect(row.original)}
        className={classes['container']}
      />
    </div>
  );
}
