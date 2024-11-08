import { useMemo } from 'react';
import { useQueryRecruitmentEvents } from '../../../../entities/recruitment/models';
import { EMPTY_ARRAY } from 'src/shared/config';
import { Tag } from '@chakra-ui/react';
import { RecruitmentEvent } from '../../../../entities/recruitment/api/recruitment.usecase';
import { createColumnHelper } from '@tanstack/table-core';

export type RecruitmentEventColumn = {
  id: number;
  name: string;
  location: string;
  passPoint: number;
  startDate: string;
  endDate: string;
  examiners: string[];
};

const columnHelper = createColumnHelper<RecruitmentEventColumn>();

export function useRecruitmentColumns() {
  return useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name'
      }),
      columnHelper.accessor('location', {
        header: 'Location'
      }),
      columnHelper.accessor('passPoint', {
        header: 'Pass Point'
      }),
      columnHelper.accessor('startDate', {
        header: 'From date'
      }),
      columnHelper.accessor('endDate', {
        header: 'To date'
      }),
      columnHelper.accessor('examiners', {
        header: 'Examiners',
        cell: props => {
          return (
            <div key={props.row.id} className={'flex flex-col gap-2'}>
              {props.getValue<string[]>().map(user => (
                <Tag
                  key={user}
                  colorScheme="teal"
                  variant="solid"
                  className={'w-fit'}
                >
                  {user}
                </Tag>
              ))}
            </div>
          );
        }
      })
    ];
  }, []);
}

type RecruitmentEventItemsProps = {
  search: string;
};

export function useRecruitmentEventItems({
  search
}: RecruitmentEventItemsProps): RecruitmentEventColumn[] {
  const { data } = useQueryRecruitmentEvents();

  return useMemo(() => {
    if (!data) {
      return EMPTY_ARRAY;
    }

    const mapper = (item: RecruitmentEvent): RecruitmentEventColumn => {
      return {
        id: item.id,
        name: item.name,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        examiners: item.examiners.map(examiner => examiner.username),
        passPoint: item.passPoint
      };
    };

    if (!search) {
      return data.items.map(mapper);
    }

    return data.items
      .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      .map(mapper);
  }, [data, search]);
}
