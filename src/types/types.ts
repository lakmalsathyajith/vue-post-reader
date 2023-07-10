import { HistoryElement, Post } from './interfaces';

export type State = {
  posts: Post[],
  committedPosts: HistoryElement[],
};

export type setPostArgs = {
  data: Post[],
  historyElement: HistoryElement
};

export type reOrderArgs = {
  originalIndex : number,
  index: number,
  upShift?: boolean
};
