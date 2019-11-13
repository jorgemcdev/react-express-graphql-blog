import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Card, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useForm } from '../../utils/hooks';

import ADD_COMMENT_MUTATION from './comment.gql';

function CommentForm({ postId }) {
  const commentInputRef = useRef(null);

  const { onChange, onSubmit, values } = useForm(
    // eslint-disable-next-line no-use-before-define
    commentFormCallback,
    {
      comment: '',
    }
  );

  const [submitComment, { loading }] = useMutation(ADD_COMMENT_MUTATION, {
    update() {
      values.comment = '';
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: values.comment,
    },
  });

  function commentFormCallback() {
    submitComment();
  }

  return (
    <Card fluid>
      <Card.Content>
        <p>Post a Comment</p>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
        >
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="Comment..."
              name="comment"
              value={values.body}
              onChange={onChange}
              ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              disabled={values.comment.trim() === ''}
            >
              Submit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentForm;
