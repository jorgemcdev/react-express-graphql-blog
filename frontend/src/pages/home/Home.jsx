import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';

import PostForm from '../../components/postForm/PostForm';
import PostList from '../../components/postList/PostList';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Grid stackable columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        <PostList />
      </Grid.Row>
    </Grid>
  );
}

export default Home;
