import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useForm(callback, initialState = {}) {
  const [values, setValues] = useState(initialState);

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    callback();
  }

  return {
    onChange,
    onSubmit,
    values,
  };
}
