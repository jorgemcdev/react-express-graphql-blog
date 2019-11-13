/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../utils/hooks';
import REGISTER_USER from './register.gql';

function Register() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState('');

  const history = useHistory();

  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData },
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

  function registerUserCallback() {
    addUser();
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
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
