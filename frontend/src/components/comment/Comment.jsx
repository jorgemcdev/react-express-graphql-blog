import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';

import DeleteButton from '../deleteButton/DeleteButton';

function Comment({ id, comment, user, callback }) {
  return (
    <Card fluid key={comment.id}>
      <Card.Content>
        {user && user.userName === comment.userName && (
          <DeleteButton
            postId={id}
            commentId={comment.id}
            callback={callback}
          />
        )}
        <Card.Header>{comment.userName}</Card.Header>
        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
    </Card>
  );
}

Comment.defaultProps = {
  user: {
    id: '',
    email: '',
    userName: '',
  },
  callback: null,
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
  }),
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  callback: PropTypes.func,
};

export default Comment;
