import gql from 'graphql-tag';

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      likeCount
      comments {
        id
        userName
        createdAt
        body
      }
      commentsCount
    }
  }
`;

export default FETCH_POST_QUERY;
