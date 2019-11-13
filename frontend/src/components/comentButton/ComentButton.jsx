import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ComentButton({ id, commentsCount }) {
  return (
    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
      <Button color="blue" basic>
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentsCount}
      </Label>
    </Button>
  );
}

ComentButton.propTypes = {
  id: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export default ComentButton;
