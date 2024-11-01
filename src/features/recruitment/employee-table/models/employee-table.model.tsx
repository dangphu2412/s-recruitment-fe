import React, { useMemo } from 'react';
import { Column } from 'react-table';
import { Employee } from '../../../../entities/recruitment/api/recruitment.usecase';
import { Link, Text, Tooltip } from '@chakra-ui/react';
import { htmlParser } from '../../../../shared/models/html-parser/html-parser';

type EmployeeColumnProps = {
  employees: Employee[];
  passPoint: number;
};

type DynamicEmployeeColumn = Record<string, unknown>;

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
}: EmployeeColumnProps): Column<EmployeeColumnView>[] {
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
      return {
        Header: () => renderGenericHeader(prop),
        accessor: compactDynamicKey(prop),
        // @ts-ignore
        Cell: props => {
          if (props.value === undefined || props.value === '') {
            return <p>No information</p>;
          }

          if (props.value.toString().startsWith('http')) {
            return (
              <p className={'max-w-[12rem]'}>
                <Link href={props.value} color="teal.500">
                  {props.value}
                </Link>
              </p>
            );
          }

          return <p className={'max-w-[12rem]'}>{props.value?.toString()}</p>;
        }
      };
    });

    return [
      {
        Header: 'Total Points',
        accessor: 'point',
        // @ts-ignore
        Cell: props => {
          const totalPoint = props.value;

          if (0 === totalPoint) {
            return <Text>Not voted</Text>;
          }

          const isPassed = totalPoint >= passPoint;
          return (
            <Text color={isPassed ? 'green' : 'red'}>
              {props.value}
              {isPassed ? ' (Passed)' : ' (Not passed)'}
            </Text>
          );
        }
      },
      {
        Header: 'My Voted point',
        accessor: 'myVotedPoint'
      },
      {
        Header: () => <div>My Note</div>,
        accessor: 'myNote',
        // @ts-ignore
        Cell: props => {
          return <Text noOfLines={1}>{htmlParser.parse(props.value)}</Text>;
        }
      },
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

  const filterSearchPredicate = searchValue
    ? (employee: Employee) => {
        const predicates = [];

        if (searchValue) {
          predicates.push(searchPredicate(employee));
        }

        return predicates.every(Boolean);
      }
    : null;
  const mapper = (employee: Employee) => ({
    data: employee.data,
    id: employee.id,
    point: employee.point,
    myVotedPoint: employee.myVotedPoint,
    myNote: employee.myNote,
    ...buildDynamicEmployeeColumnView(employee.data as DynamicEmployeeColumn)
  });

  if (!filterSearchPredicate) {
    return employees.map(mapper);
  }

  return employees.filter(filterSearchPredicate).map(mapper);
}
