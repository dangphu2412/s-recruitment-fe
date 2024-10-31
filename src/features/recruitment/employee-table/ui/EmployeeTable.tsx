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
  const { search, setSearch } = useSearch();
  const columns = useEmployeeColumns({ employees, passPoint });
  const employeeItems = useMemo(() => {
    return mapToEmployeeTable({
      employees,
      searchValue: search
    });
  }, [employees, search]);

  return (
    <div className={'space-y-3'}>
      <Text fontSize={'md'} fontWeight={'medium'}>
        Employee information
      </Text>

      <div className={'flex gap-2'}>
        <Input
          placeholder={'Search employee ...'}
          onChange={e => setSearch(e.target.value)}
        />

        <EmployeeFilter />
      </div>

      <Table
        caption={'Employee information'}
        columns={columns}
        items={employeeItems}
        onRowClick={row => onSelect(row.original)}
        cellPropGetter={{
          className: 'whitespace-normal'
        }}
      />
    </div>
  );
}
