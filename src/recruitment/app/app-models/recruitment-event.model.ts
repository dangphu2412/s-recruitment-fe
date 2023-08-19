import { DateRange } from '../../../system/domain/clients/filter.api';
import { BoxItem } from '../../../system/domain/clients/combobox.api';
export type ScoreStandard = {
  standard: string;
  point: number;
};
export type CreateRecruitmentEventFormModal = {
  name: string;
  location: string;
  recruitmentRange: DateRange;
  examiners: string[];
  scoreStandards: ScoreStandard[];
};

export type RecruitmentEventColumn = {
  id: number;
  name: string;
  location: string;
  recruitmentRange: DateRange;
  examiners: BoxItem[];
};
