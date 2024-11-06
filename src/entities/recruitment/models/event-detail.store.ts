import { create } from 'zustand/react';
import { VoteStatus } from '../configs/event.constant';
import { DEFAULT_PAGINATION, Pagination } from '../../../shared/models';

type EventDetailState = Pagination & {
  voteStatus: VoteStatus | null;
};

type EventDetailStore = Pagination & {
  voteStatus: VoteStatus | null;
  toggleVoteStatus: (voteStatus: VoteStatus) => void;
  setValues: (values: Partial<EventDetailState>) => void;
};

export const useEventDetailStore = create<EventDetailStore>(set => ({
  ...DEFAULT_PAGINATION,
  voteStatus: null,
  toggleVoteStatus: (voteStatus: VoteStatus) => {
    set(pre => {
      if (pre.voteStatus === voteStatus) {
        return { ...pre, voteStatus: null };
      }

      return { ...pre, voteStatus };
    });
  },
  setValues: (values: Partial<EventDetailState>) => {
    set(pre => ({ ...pre, ...values }));
  }
}));
