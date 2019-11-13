/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../utils/hooks';
import LOGIN_USER from './login.gql';

function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState('');
  const history = useHistory();

  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    userName: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData },
      }
    ) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
    setErrors('');
  }

  const ServerErrors = () =>
    errors && <div className="ui error message">{errors}</div>;

  return (
    <div className="form-container">
      <ServerErrors />
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          label="UserName"
          placeholder="Username..."
          name="userName"
          value={values.userName}
          onChange={onChange}
        />
        <Form.Input
          label="password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
