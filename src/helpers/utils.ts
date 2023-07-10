// eslint-disable-next-line import/extensions, import/no-unresolved
import { Post } from '@/types/interfaces';

export const shiftArrayElementByGivenValue = (
  input:Post[],
  index:number,
  upShift:boolean | undefined = true,
) => {
  const inputState = input;
  let swapElement;
  if (upShift) {
    swapElement = inputState[index];
    inputState[index] = inputState[index - 1];
    inputState[index - 1] = swapElement;
  } else {
    swapElement = inputState[index + 1];
    inputState[index + 1] = inputState[index];
    inputState[index] = swapElement;
  }
  return inputState;
};

export const generateHistoryElementForPosts = (
  oldState:Post[],
  originalIndex:number,
  index:number,
  upShift:boolean | undefined = true,
) => {
  const literalIndex = index;
  const metaData = `Moved post ${originalIndex} from index ${literalIndex} to index ${upShift ? literalIndex - 1 : literalIndex + 1}`;
  return { oldState, metaData };
};
