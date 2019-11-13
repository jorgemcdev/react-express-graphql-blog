import React, { useContext } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import { AuthContext } from '../../context/auth';

import LikeButton from '../likeButton/LikeButton';
import DeleteButton from '../deleteButton/DeleteButton';
import CommentButton from '../comentButton/ComentButton';

function PostCard({
  post: { id, body, createdAt, userName, likeCount, commentsCount, likes },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          circular
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <CommentButton id={id} commentsCount={commentsCount} />
        {user && user.userName === userName && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    userName: PropTypes.string,
    likeCount: PropTypes.number,
    commentsCount: PropTypes.number,
    likes: PropTypes.array,
  }).isRequired,
};

export default PostCard;
