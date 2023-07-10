import { State } from '@/types/types';
import { HistoryElement, Post } from '@/types/interfaces';
import { SET_POSTS, SET_HISTORY_ELEMENTS, RESTORE_HISTORY } from './types/mutations';
import { setPostArgs } from './actions';

const mutations = {
  [SET_POSTS](state: State, { data }: setPostArgs) {
    state.posts = data;
  },
  [RESTORE_HISTORY](state: State, historyPosts:Post[]) {
    state.posts = [...historyPosts];
  },
  [SET_HISTORY_ELEMENTS](state: State, historyElements: HistoryElement[]) {
    state.committedPosts = [...historyElements];
  },
};

export default mutations;
