import gql from 'graphql-tag';

const root = gql`
  type Query {
    empty: String
  }

  type Mutation {
    empty: String
  }

  type Subscription {
    empty: String
  }
`;

export default root;
