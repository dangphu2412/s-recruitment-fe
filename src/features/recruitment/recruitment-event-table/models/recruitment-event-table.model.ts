import { Column } from 'react-table';
import { useMemo } from 'react';
import { DateRange } from '../../../../shared/models/filter.api';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { useQueryRecruitmentEvents } from '../../../../entities/recruitment/models';
import { EMPTY_ARRAY } from '../../../../shared/config/constants';

export type RecruitmentEventColumn = {
  id: number;
  name: string;
  location: string;
  recruitmentRange: DateRange;
  examiners: BoxItem[];
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
        Header: 'From date',
        accessor: val => val.recruitmentRange.fromDate,
        maxWidth: 100,
        minWidth: 80,
        width: 80
      },
      {
        Header: 'To date',
        accessor: val => val.recruitmentRange.toDate,
        maxWidth: 100,
        minWidth: 80,
        width: 80
      }
    ];
  }, []);
}

export function useRecruitmentEventItems(): RecruitmentEventColumn[] {
  const { data } = useQueryRecruitmentEvents();

  return useMemo(() => {
    if (!data) {
      return EMPTY_ARRAY;
    }

    return data.items.map(item => {
      return {
        id: item.id,
        name: item.name,
        location: item.location,
        recruitmentRange: {
          fromDate: item.startDate,
          toDate: item.endDate
        },
        examiners: []
      };
    });
  }, [data]);
}
