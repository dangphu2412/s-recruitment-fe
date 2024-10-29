import {
  CreateRecruitmentEventPayload,
  MarkEmployeePayload,
  RecruitmentApiClient,
  RecruitmentEvent,
  RecruitmentEventDetail
} from './recruitment.usecase';
import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';

export const recruitmentApiClient: RecruitmentApiClient = {
  markEmployeePoint(payload: MarkEmployeePayload): Promise<void> {
    return authorizedHttpClient.request({
      method: 'post',
      url: `/recruitments/events/${payload.eventId}/mark`,
      data: payload
    });
  },
  getEventDetail(id: number): Promise<RecruitmentEventDetail> {
    return authorizedHttpClient.request({
      method: 'get',
      url: `/recruitments/events/${id}`
    });
  },
  createEvent(payload: CreateRecruitmentEventPayload): Promise<void> {
    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('location', payload.location);
    formData.append('passPoint', payload.passPoint);
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
