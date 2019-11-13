import gql from 'graphql-tag';

const User = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  extend type Mutation {
    register(RegisterInput: RegisterInput): User!
    login(LoginInput: LoginInput): User!
  }
`;

export default User;
