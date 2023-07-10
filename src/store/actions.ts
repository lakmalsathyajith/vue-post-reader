import { ActionContext } from 'vuex';
import { State } from '@/types/types';
import { HistoryElement, Post } from '@/types/interfaces';
import axiosClient from '../httpClient';
import { SET_POSTS, SET_HISTORY_ELEMENTS, RESTORE_HISTORY } from './types/mutations';
import { shiftArrayElementByGivenValue, generateHistoryElementForPosts } from '../helpers/utils';

type reOrderArgs = {
  originalIndex : number,
  index: number,
  upShift?: boolean
};

export type setPostArgs = {
  data: Post[],
  historyElement: HistoryElement
};

const actions = {
  getPosts({ commit }: ActionContext<State, State>) {
    axiosClient.get('posts')
      .then(({ data }) => {
        const firstNPosts = data.slice(0, 5) || [];
        const firstNPostsWithOrderIndex = firstNPosts.map((post:Post, i:number) => {
          const postToUpdate = post;
          postToUpdate.index = i + 1;
          return postToUpdate;
        });
        commit(SET_POSTS, { data: firstNPostsWithOrderIndex });
      }).catch((err)=> {console.log(err)});
  },
  reOrderPosts(
    { commit, getters }: ActionContext<State, State>,
    { originalIndex, index, upShift = true }: reOrderArgs,
  ) {
    const postsInState = getters.allPosts;
    const oldState = [...postsInState];
    const shiftedPosts = shiftArrayElementByGivenValue(postsInState, index, upShift);
    const historyElement = generateHistoryElementForPosts(oldState, originalIndex, index, upShift);
    commit(SET_POSTS, { data: shiftedPosts, historyElement });
  },
  restoreHistoryElement({ commit, getters }: ActionContext<State, State>, index:number) {
    const historyArray = [...getters.getHistory];
    const historyElement = historyArray[index];
    const newHistoryArray = historyArray.splice(index + 1, historyArray.length);
    commit(SET_HISTORY_ELEMENTS, newHistoryArray);
    commit(RESTORE_HISTORY, historyElement.oldState);
  },
};

export default actions;
