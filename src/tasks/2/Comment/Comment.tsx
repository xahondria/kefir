import React, { useState } from 'react';
import commentStyles from './Comment.module.css';
import { CommentModel } from '../Models/commentModel';
import { AuthorModel } from '../Models/authorModel';
import { getChildCommentList } from '../helpers/comments';

const Comment = (props: {comment: CommentModel, commentList?: Array<CommentModel>, authors?: Array<AuthorModel>, parent?: CommentModel}) => {

  const [likes, setLikes] = useState<{number: number, isActive: boolean}>({
    number: props.comment.likes, isActive: false
  });

  const author = props.authors?.find(author => author.id === props.comment.author) ?? {name: 'noname'} as AuthorModel;
  const comment = props.comment;
  const created = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(comment.created));

  let childComments: Array<CommentModel> = [];
  if (!props.parent && props.commentList) {
    childComments = getChildCommentList(props.commentList, props.comment);
  }

  const onClickLike = (): void => {

    setLikes({
      number: likes.isActive ? comment.likes : comment.likes + 1,
      isActive: !likes.isActive,
    });
  };

  return <li className={`d-flex ${commentStyles.element}`}>

    <div className={`flex-column flex-shrink-0 flex-grow-0 ${commentStyles.avatarWrapper}`}>
      <img src={author?.avatar}
           className={commentStyles.avatar}
           alt={`${author?.name} avatar`}/>
    </div>

    <div className={'flex-column w-100'}>

      <header className={`d-flex justify-content-between ${commentStyles.header}`}>
        <div>
          <h5 className={commentStyles.userName}>{author?.name}</h5>
          <div className={commentStyles.date}>{created}</div>
        </div>
        <div className={`d-flex ${commentStyles.buttonHeartWrapper} ${likes.isActive ? commentStyles.buttonHeartWrapper_active : ''}`}
             onClick={onClickLike}>
          <svg className={`${commentStyles.buttonHeart}`}
               width="25"
               height="25"
               viewBox="-2 -2 34 34"
               fill="red"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M15 28.331C14.5729 28.331 14.1611 28.1763 13.8402 27.8952C12.6283 26.8355 11.4599 25.8396 10.429 24.9612L10.4237 24.9566C7.40134 22.381 4.7914 20.1567 2.97546 17.9656C0.945509 15.5161 0 13.1937 0 10.6565C0 8.19145 0.845259 5.91728 2.37991 4.25262C3.93287 2.56828 6.06375 1.64062 8.38072 1.64062C10.1124 1.64062 11.6984 2.18811 13.0943 3.26775C13.7988 3.81271 14.4374 4.47968 15 5.25764C15.5628 4.47968 16.2011 3.81271 16.9059 3.26775C18.3018 2.18811 19.8877 1.64062 21.6195 1.64062C23.9362 1.64062 26.0673 2.56828 27.6203 4.25262C29.1549 5.91728 29.9999 8.19145 29.9999 10.6565C29.9999 13.1937 29.0547 15.5161 27.0247 17.9654C25.2088 20.1567 22.5991 22.3808 19.5771 24.9561C18.5444 25.836 17.3742 26.8334 16.1595 27.8957C15.8388 28.1763 15.4268 28.331 15 28.331V28.331ZM8.38072 3.39798C6.56043 3.39798 4.88822 4.12445 3.67172 5.44373C2.43713 6.78291 1.75712 8.63411 1.75712 10.6565C1.75712 12.7904 2.5502 14.6988 4.32838 16.8443C6.04705 18.9182 8.60342 21.0967 11.5633 23.6192L11.5688 23.6238C12.6036 24.5057 13.7766 25.5054 14.9975 26.573C16.2256 25.5034 17.4005 24.502 18.4373 23.6188C21.397 21.0963 23.9531 18.9182 25.6718 16.8443C27.4497 14.6988 28.2428 12.7904 28.2428 10.6565C28.2428 8.63411 27.5628 6.78291 26.3282 5.44373C25.112 4.12445 23.4395 3.39798 21.6195 3.39798C20.286 3.39798 19.0617 3.82187 17.9807 4.65775C17.0173 5.40298 16.3463 6.34506 15.9528 7.00424C15.7505 7.34322 15.3943 7.54555 15 7.54555C14.6056 7.54555 14.2495 7.34322 14.0471 7.00424C13.6539 6.34506 12.9828 5.40298 12.0192 4.65775C10.9382 3.82187 9.71396 3.39798 8.38072 3.39798V3.39798Z"/>
          </svg>
          <div>{likes.number}</div>
        </div>
      </header>

      <section>{comment.text}</section>

      {childComments?.length ?
        <ul className={commentStyles.list}>
          {childComments?.map(c =>
            <Comment key={c.id}
                     comment={c}
                     commentList={props.commentList}
                     authors={props.authors}
                     parent={comment}></Comment>)}
        </ul> : ''}

    </div>

  </li>;
};

export default Comment;
