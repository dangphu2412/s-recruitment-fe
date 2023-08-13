import { DateRange } from '../../../system/domain/clients/filter.api';
import { BoxItem } from '../../../system/domain/clients/combobox.api';

export type CreateRecruitmentEventFormModal = {
  name: string;
  location: string;
  recruitmentRange: DateRange<Date>;
  examiners: BoxItem[];
};
