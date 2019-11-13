import gql from 'graphql-tag';

const Post = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]
    commentsCount: Int
    likes: [Like]
    likeCount: Int
    uploads: [File]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    userName: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  extend type Mutation {
    createPost(body: String): Post!
    uploadPostImage(file: Upload): File!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  extend type Subscription {
    newPost: Post!
  }
`;

export default Post;
