import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
  <small>{error.message.replace('GraphQL error:', '').trim()}</small>
);

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorMessage;
