import React, { useEffect, useState } from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import PostCard from '../postCard/PostCard';

import FETCH_POSTS_QUERY from './postList.gql';

function PostList() {
  const [posts, setPosts] = useState([]);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      )}
    </>
  );
}

export default PostList;
