import { useMemo } from 'react';
import { RecruitmentEventColumn } from '../app-models/recruitment-event.model';
import { useQueryRecruitmentEvents } from './useQueryRecruitmentEvents';
import { EMPTY_ARRAY } from '../../../system/domain/constants';

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
