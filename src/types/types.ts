import { HistoryElement, Post } from './interfaces';

export type State = {
  posts: Post[],
  committedPosts: HistoryElement[],
};
