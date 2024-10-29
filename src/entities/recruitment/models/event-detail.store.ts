import { create } from 'zustand/react';
import { VoteStatus } from '../configs/event.constant';

type EventDetailState = {
  voteStatus: VoteStatus | null;
  toggleVoteStatus: (voteStatus: VoteStatus) => void;
};

export const useEventDetailStore = create<EventDetailState>(set => ({
  voteStatus: null,
  toggleVoteStatus: (voteStatus: VoteStatus) => {
    set(pre => {
      if (pre.voteStatus === voteStatus) {
        return { ...pre, voteStatus: null };
      }

      return { ...pre, voteStatus };
    });
  }
}));
