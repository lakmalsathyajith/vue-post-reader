export interface Post {
  body:string;
  id:number;
  index:number;
  title: string;
  userId: number;
}

export interface HistoryElement {
  metaData:string;
  oldState:Post[];
}
