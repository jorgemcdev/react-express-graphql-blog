import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import FETCH_POSTS_QUERY from '../postList/postList.gql';
import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
} from './deleteButton.gql';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const newData = {
          getPosts: data.getPosts.filter(post => post.id !== postId),
        };
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
        if (callback) callback();
      }
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

DeleteButton.defaultProps = {
  callback: null,
  commentId: null,
};

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string,
  callback: PropTypes.func,
};

export default DeleteButton;
