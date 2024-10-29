import { Column } from 'react-table';
import { useMemo } from 'react';
import { useQueryRecruitmentEvents } from '../../../../entities/recruitment/models';
import { EMPTY_ARRAY } from '../../../../shared/config/constants';
import { Tag } from '@chakra-ui/react';
import { RecruitmentEvent } from '../../../../entities/recruitment/api/recruitment.usecase';

export type RecruitmentEventColumn = {
  id: number;
  name: string;
  location: string;
  passPoint: number;
  startDate: string;
  endDate: string;
  examiners: string[];
};

export function useRecruitmentColumns(): Column<RecruitmentEventColumn>[] {
  return useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: 'name',
        maxWidth: 100,
        minWidth: 80,
        width: 80
      },
      {
        Header: 'Location',
        accessor: 'location',
        maxWidth: 100,
        minWidth: 80,
        width: 80
      },
      {
        Header: 'Pass Point',
        accessor: 'passPoint'
      },
      {
        Header: 'From date',
        accessor: val => val.startDate,
        maxWidth: 100,
        minWidth: 80,
        width: 80
      },
      {
        Header: 'To date',
        accessor: val => val.endDate,
        maxWidth: 100,
        minWidth: 80,
        width: 80
      },
      {
        Header: 'Examiners',
        accessor: 'examiners',
        Cell: props => {
          return (
            <div key={props.row.id} className={'flex flex-col gap-2'}>
              {props.value.map(user => (
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
      }
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
