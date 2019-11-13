import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(LoginInput: { userName: $userName, password: $password }) {
      userName
      token
    }
  }
`;

export default LOGIN_USER;
