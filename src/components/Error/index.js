import React from 'react';

const ErrorMessage = ({ error }) => (
    <small>{error.message.replace('GraphQL error:', '').trim()}</small>
);

export default ErrorMessage;
