import { ActionContext } from 'vuex';
import { State, reOrderArgs } from '@/types/types';
import { Post } from '@/types/interfaces';
import axiosClient from '../httpClient';
import { SET_POSTS, SET_HISTORY_ELEMENTS, RESTORE_HISTORY } from './types/mutations';
import { shiftArrayElementByGivenValue, generateHistoryElementForPosts } from '../helpers/utils';

const actions = {
  // Get all posts from the api
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
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.error('Error while fetching posts.');
        commit(SET_POSTS, { data: [] });
      });
  },
  // Reorder the post list by given values
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
  // Persist the post list from the history element
  restoreHistoryElement({ commit, getters }: ActionContext<State, State>, index:number) {
    const historyArray = [...getters.getHistory];
    const historyElement = historyArray[index];
    const newHistoryArray = historyArray.splice(index + 1, historyArray.length);
    commit(SET_HISTORY_ELEMENTS, newHistoryArray);
    commit(RESTORE_HISTORY, historyElement.oldState);
  },
};

export default actions;
