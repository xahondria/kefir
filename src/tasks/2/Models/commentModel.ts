export interface CommentModel {
  id: number;
  created: string;
  text: string;
  author: number;
  parent: number;
  likes: number;
}
