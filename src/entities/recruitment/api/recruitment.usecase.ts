import { Page } from '../../../shared/models';
import { DateRange } from '../../../shared/models/filter.api';
import { User } from '../../user/api';
import { AggregateRoot } from '../../../shared/models/aggregate-model';

export type RecruitmentEvent = {
  id: number;
  name: string;
  location: string;
  passPoint: number;
  startDate: string;
  endDate: string;
  examiners: User[];
};

export type Employee = {
  id: string;
  data: object;
  point: number;
  myVotedPoint: number;
  myNote: string;
  [key: string]: unknown;
};

export type RecruitmentEventDetail = {
  id: number;
  name: string;
  location: string;
  passPoint: number;
  remark: string;
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
  description: number;
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
  remark: string;
  location: string;
  passPoint: number;
  examinerIds: string[];
  recruitmentRange: DateRange;
  scoringStandards: ScoreStandard[];
  file: File;
};

export type MarkEmployeePayload = {
  eventId: number;
  // authorId get from token
  employeeId: string;
  point: number;
  note: string;
};

export type GetEventDetailRequest = AggregateRoot<number> & {
  voteStatus: string | null;
};

export type DownloadEmployeesPayload = {
  eventId: number;
};

export type RecruitmentApiClient = {
  getEvents(): Promise<Page<RecruitmentEvent>>;
  getEventDetail(query: GetEventDetailRequest): Promise<RecruitmentEventDetail>;
  createEvent(payload: CreateRecruitmentEventPayload): Promise<void>;
  markEmployeePoint(payload: MarkEmployeePayload): Promise<void>;
  downloadEmployees(payload: DownloadEmployeesPayload): Promise<Blob>;
};
