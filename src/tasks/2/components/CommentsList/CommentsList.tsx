import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import commentListStyles from './CommentList.module.css';
import { DataModel } from '../../models/dataModel';
import { fetchData } from '../../helpers/fetchData';
import { CommentModel } from '../../models/commentModel';


const CommentsList = () => {
  const [state, setState] = useState<DataModel | null | string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData(setState, setIsLoading);
  }, []);

  if (isLoading) {
    return <div className={commentListStyles.loading}>Данные загружаются</div>;
  } else {

    if (typeof state === 'string') {
      return <div className={commentListStyles.error}>{state}</div>;
    }

    const list: Array<CommentModel> = state?.comments?.filter(c => !c.parent).sort((left, right) => {
      const leftCreated = new Date(left.created);
      const rightCreated = new Date(right.created);
      if (leftCreated < rightCreated) {
        return -1;
      }
      if (leftCreated > rightCreated) {
        return 1;
      }
      return 0;
    }) ?? [];

    return <ul className={commentListStyles.list}>{list.map((comment) =>
      <Comment key={comment?.id}
               comment={comment}
               commentList={state?.comments}
               authors={state?.authors}></Comment>)}</ul>;
  }

};

export default CommentsList;
