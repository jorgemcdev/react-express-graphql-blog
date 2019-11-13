import gql from 'graphql-tag';

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      userName
      comments {
        id
        body
        createdAt
      }
      commentsCount
      likes {
        id
        userName
      }
      likeCount
    }
  }
`;

export default FETCH_POSTS_QUERY;
