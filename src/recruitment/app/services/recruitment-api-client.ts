import {
  CreateRecruitmentEventPayload,
  MarkEmployeePayload,
  RecruitmentApiClient,
  RecruitmentEvent,
  RecruitmentEventDetail
} from '../../domain/recruitment.usecase';
import { Page } from '../../../system/domain/clients';
import { authorizedHttpClient } from '../../../system/infrastructure/factories/http-client.factories';

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
    return authorizedHttpClient.request({
      method: 'post',
      url: '/recruitments/events',
      data: payload
    });
  },
  getEvents(): Promise<Page<RecruitmentEvent>> {
    return authorizedHttpClient.request({
      method: 'get',
      url: '/recruitments/events'
    });
  }
};
