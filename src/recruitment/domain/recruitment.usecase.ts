import { Page } from '../../system/domain/clients';
import { DateRange } from '../../system/domain/clients/filter.api';

export type RecruitmentEvent = {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  examiners: string[];
};

export type ScoreStandard = {
  standard: string;
  point: number;
};

export type CreateRecruitmentEventPayload = {
  name: string;
  location: string;
  examinerIds: string[];
  recruitmentRange: DateRange;
  scoringStandards: ScoreStandard[];
};

export type RecruitmentApiClient = {
  getEvents(): Promise<Page<RecruitmentEvent>>;
  createEvent(payload: CreateRecruitmentEventPayload): Promise<void>;
};
