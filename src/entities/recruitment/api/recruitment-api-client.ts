import {
  CreateRecruitmentEventPayload,
  GetEventDetailRequest,
  MarkEmployeePayload,
  RecruitmentApiClient,
  RecruitmentEvent,
  RecruitmentEventDetail
} from './recruitment.usecase';
import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';
import { AggregateRoot } from '../../../shared/models/aggregate-model';

export const recruitmentApiClient: RecruitmentApiClient = {
  markEmployeePoint(payload: MarkEmployeePayload): Promise<void> {
    return authorizedHttpClient.request({
      method: 'post',
      url: `/recruitments/events/${payload.eventId}/mark`,
      data: payload
    });
  },
  getEventDetail({
    id,
    voteStatus
  }: GetEventDetailRequest): Promise<RecruitmentEventDetail> {
    return authorizedHttpClient.request({
      method: 'get',
      url: `/recruitments/events/${id}`,
      params: {
        voteStatus
      }
    });
  },
  createEvent(payload: CreateRecruitmentEventPayload): Promise<void> {
    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('location', payload.location);
    formData.append('passPoint', payload.passPoint.toString());
    formData.append(
      'recruitmentRange',
      JSON.stringify(payload.recruitmentRange)
    );
    formData.append('examinerIds', JSON.stringify(payload.examinerIds));
    formData.append(
      'scoringStandards',
      JSON.stringify(payload.scoringStandards)
    );
    formData.append('file', payload.file);

    return authorizedHttpClient.request({
      method: 'post',
      url: '/recruitments/events',
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getEvents(): Promise<Page<RecruitmentEvent>> {
    return authorizedHttpClient.request({
      method: 'get',
      url: '/recruitments/events'
    });
  }
};
