import { Column } from 'react-table';
import { RecruitmentEventColumn } from '../app-models/recruitment-event.model';
import { useMemo } from 'react';

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
