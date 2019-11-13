import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $file: Upload) {
    createPost(body: $body, file: $file) {
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
        createdAt
      }
      likeCount
    }
  }
`;

export default CREATE_POST_MUTATION;
