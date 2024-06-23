import { Forum } from "./forum";

export class Post {
  idPost: number = 0;
  namePost: string = "";
  queryDescription: string = "";
  datePost: Date = new Date();
  forum: Forum = new Forum();
}
