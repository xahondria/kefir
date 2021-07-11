import { CommentModel } from './commentModel';
import { AuthorModel } from './authorModel';

export interface DataModel {
  comments: Array<CommentModel>,
  authors: Array<AuthorModel>,
}

