import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  const errorMessage = error.message.replace('GraphQL error:', '').trim();

  let displayMessage = errorMessage;

  if (
    errorMessage.includes('Invalid login credentials') ||
    errorMessage.includes('Wrong password') ||
    errorMessage.includes('Authentication failed') ||
    errorMessage.includes('Invalid email or password') ||
    errorMessage.toLowerCase().includes('incorrect') ||
    errorMessage.toLowerCase().includes('invalid credentials')
  ) {
    displayMessage =
      'Invalid email or password. Please check your credentials and try again.';
  }

  return <small>{displayMessage}</small>;
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorMessage;
