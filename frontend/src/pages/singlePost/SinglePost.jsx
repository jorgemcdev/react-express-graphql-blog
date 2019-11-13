import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../../context/auth';

import LikeButton from '../../components/likeButton/LikeButton';
import DeleteButton from '../../components/deleteButton/DeleteButton';
import CommentButton from '../../components/comentButton/ComentButton';
import Comment from '../../components/comment/Comment';
import CommentForm from '../../components/commentForm/CommentForm';

import FETCH_POST_QUERY from './singlePost.gql';

function SinglePost() {
  const { user } = useContext(AuthContext);

  const { postId } = useParams();
  const history = useHistory();

  const { loading, data: { getPost: post } = { post: [] } } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: { postId },
    }
  );

  const deletPostCallback = () => {
    history.push('/');
  };

  if (loading) return <p>Loading</p>;

  if (!post) return <p>Not found</p>;

  const {
    id,
    body,
    createdAt,
    userName,
    comments,
    likes,
    likeCount,
    commentsCount,
  } = post;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            circular
            size="small"
            floated="right"
          />
        </Grid.Column>

        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton id={id} commentsCount={commentsCount} />
                {user && user.userName === userName && (
                  <DeleteButton postId={id} callback={deletPostCallback} />
                )}
              </Card.Content>
            </Card.Content>
          </Card>

          {user && <CommentForm postId={id} />}

          {comments &&
            comments.map(comment => (
              <Comment
                key={comment.id}
                id={id}
                comment={comment}
                user={user}
                deletPostCallback={deletPostCallback}
              />
            ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SinglePost;
