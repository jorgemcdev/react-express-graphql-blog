import gql from 'graphql-tag';

const ADD_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        userName
      }
      commentsCount
    }
  }
`;

export default ADD_COMMENT_MUTATION;
