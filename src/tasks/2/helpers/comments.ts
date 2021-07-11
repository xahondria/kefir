import { CommentModel } from '../models/commentModel';

export const getChildCommentList = (comments: Array<CommentModel>, parent: CommentModel): Array<CommentModel> => {
  const childComments: Array<CommentModel> = [];

  /**
   * @param c - comments
   * @param p - parent
   */
  const getChildComment = (c: Array<CommentModel>, p: CommentModel): void => {
    const child = c.find(c => c.parent === p.id);
    if (!!child) {
      childComments.push(child);
      getChildComment(c, child);
    }
    return;
  };

  getChildComment(comments, parent);
  return childComments;
};
