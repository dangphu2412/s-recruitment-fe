import { Page } from '../../system/domain/clients';
import { DateRange } from '../../system/domain/clients/filter.api';

export type RecruitmentEvent = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  examiners: string[];
};

export type Employee = {
  id: string;
  data: object;
  point: number;
  myVotedPoint: number;
  myNote: string;
};

export type RecruitmentEventDetail = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  authorId: string;
  scoringStandards: ScoringStandard[];
  examiners: Examiner[];
  employees: Employee[];
};

export type ScoringStandard = {
  standard: string;
  point: number;
};

export type Examiner = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  birthday: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
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

export type MarkEmployeePayload = {
  eventId: number;
  // authorId get from token
  employeeId: string;
  point: number;
  note: string;
};

export type RecruitmentApiClient = {
  getEvents(): Promise<Page<RecruitmentEvent>>;
  getEventDetail(id: number): Promise<RecruitmentEventDetail>;
  createEvent(payload: CreateRecruitmentEventPayload): Promise<void>;
  markEmployeePoint(payload: MarkEmployeePayload): Promise<void>;
};
