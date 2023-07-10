import { HistoryElement, Post } from '@/types/interfaces';
import { State } from '@/types/types';

export const allPosts = (state:State):Post[] => state.posts;
export const getHistory = (state:State): HistoryElement[] => state.committedPosts;
