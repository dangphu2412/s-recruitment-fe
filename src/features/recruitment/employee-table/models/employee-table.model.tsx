import React, { useMemo } from 'react';
import { Employee } from '../../../../entities/recruitment/api/recruitment.usecase';
import { Link, Text, Tooltip } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/table-core';

type EmployeeColumnProps = {
  employees: Employee[];
  passPoint: number;
};

type DynamicEmployeeColumn = Record<string, unknown>;

const columnHelper = createColumnHelper<EmployeeColumnView>();

export type EmployeeColumnView = {
  id: string;
  point: number;
  myVotedPoint: number;
  myNote: string;
} & DynamicEmployeeColumn;

function compactDynamicKey(key: string) {
  if (key.length > 10) return key.slice(0, 10);

  return key;
}

function buildDynamicEmployeeColumnView(
  object: Record<string, unknown>
): DynamicEmployeeColumn {
  const result: DynamicEmployeeColumn = {};

  Object.keys(object).forEach(key => {
    result[compactDynamicKey(key)] = object[key];
  });

  return result;
}

export function useEmployeeColumns({
  employees,
  passPoint
}: EmployeeColumnProps) {
  const { data = {} } = employees?.[0] ?? {};

  function renderGenericHeader(value: string = '') {
    if (value.length > 15) {
      return (
        <Tooltip label={value}>
          <Text className={'w-fit'}>{value.slice(0, 15)} ..</Text>
        </Tooltip>
      );
    }
    return <div className={'w-fit'}>{value}</div>;
  }

  return useMemo(() => {
    const dynamicColumns = Object.keys(data).map(prop => {
      return columnHelper.accessor(compactDynamicKey(prop), {
        header: () => renderGenericHeader(prop),
        // @ts-ignore
        cell: props => {
          const value = props.getValue<string | undefined>();

          if (value === undefined || value === '') {
            return <p>No information</p>;
          }

          if (value.toString().startsWith('http')) {
            return (
              <p className={'max-w-[12rem]'}>
                <Link href={value} target="_blank" color="teal.500">
                  {value}
                </Link>
              </p>
            );
          }

          return <p className={'max-w-[12rem]'}>{value?.toString()}</p>;
        }
      });
    });

    return [
      columnHelper.accessor('point', {
        header: 'Total Points',
        // @ts-ignore
        cell: props => {
          const totalPoint = props.getValue<number>() ?? 0;

          if (0 === totalPoint) {
            return <Text>Not voted</Text>;
          }

          const isPassed = totalPoint >= passPoint;
          return (
            <Text color={isPassed ? 'green' : 'red'}>
              {props.getValue<number>()}
              {isPassed ? ' (Passed)' : ' (Not passed)'}
            </Text>
          );
        }
      }),
      columnHelper.accessor('myVotedPoint', {
        header: 'My Voted'
      }),
      ...dynamicColumns
    ];
  }, [data, passPoint]);
}

type EmployeeTableInput = {
  employees: Employee[];
  searchValue: string;
};

export function mapToEmployeeTable({
  employees,
  searchValue
}: EmployeeTableInput): EmployeeColumnView[] {
  const searchPredicate = (employee: Employee) => {
    const { data } = employee;
    const values = Object.values(data);

    return values.some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  };

  const mapper = (employee: Employee) => ({
    data: employee.data,
    id: employee.id,
    point: employee.point,
    myVotedPoint: employee.myVotedPoint,
    myNote: employee.myNote,
    ...buildDynamicEmployeeColumnView(employee.data as DynamicEmployeeColumn)
  });

  if (!searchValue) {
    return employees.map(mapper);
  }

  return employees.filter(searchPredicate).map(mapper);
}
