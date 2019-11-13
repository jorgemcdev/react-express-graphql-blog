import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import LIKE_POST_MUTATION from './likeButton.gql';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.userName === user.userName)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const loginButton = (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  const likeButton = liked ? (
    <Button color="teal">
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {user ? likeButton : loginButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

LikeButton.defaultProps = {
  user: {
    id: '',
    email: '',
    userName: '',
  },
};

LikeButton.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
  }).isRequired,
};

export default LikeButton;
