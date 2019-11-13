/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Card, Button, Form } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

import { useForm } from '../../utils/hooks';

import CREATE_POST_MUTATION from './postForm.gql';
import FETCH_POSTS_QUERY from '../postList/postList.gql';

function PostForm() {
  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [file, setFile] = useState([]);

  const onDrop = useCallback(([f]) => {
    setFile(f);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: { ...values, file },
    update(proxy, result) {
      console.log('-->', { ...values, file });
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = { getPosts: [result.data.createPost, ...data.getPosts] };
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>Create a post</Card.Header>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Form.Input
                placeholder="Hi World!"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error && true}
              />

              <div {...getRootProps()} className="ui input">
                <input {...getInputProps()} className="ui input" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <p>Drag N drop some files here, or click to select files</p>

                    {file && file.path}
                  </>
                )}
              </div>

              <Button type="submit" color="teal">
                Submit
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              {error.graphQLErrors[0].message}
            </div>
          )}
        </Card.Content>
      </Card>
      <br />
    </>
  );
}

export default PostForm;
