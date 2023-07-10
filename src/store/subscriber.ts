import { MutationPayload } from 'vuex';
import { State } from '@/types/types';
import { SET_POSTS } from './types/mutations';

const subscribers = {
  historySubscriber(mutation: MutationPayload, state:State) {
    switch (mutation.type) {
      case SET_POSTS:
        // eslint-disable-next-line no-case-declarations
        const { historyElement } = mutation.payload;
        state.committedPosts = historyElement ? [historyElement, ...state.committedPosts] : [];
        break;
      default:
    }
  },
};

export default subscribers;
