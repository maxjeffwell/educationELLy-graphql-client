import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import { GET_ALL_STUDENTS_QUERY } from '../Students';

const StyledDeleteButton = styled.button`
  color: ${props => props.theme.green};
  font-family: 'Roboto', 'sans-serif';
  font-weight: bold;
  text-decoration: none;
  border: 2px solid ${props => props.theme.green};
  padding: 8px 15px;
  border-radius: 5px;
  transition: all 0.2s ease;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 160px;
  height: 44px;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 1;

  &:hover {
    background: ${props => props.theme.green};
    color: ${props => props.theme.white};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DELETE_STUDENT_MUTATION = gql`
  mutation deleteStudent($_id: ID!) {
    deleteStudent(_id: $_id) {
      _id
    }
  }
`;

const StudentDelete = ({ studentId }) => {
  const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_STUDENTS_QUERY }],
    optimisticResponse: {
      deleteStudent: {
        _id: studentId,
        __typename: 'Student',
      },
    },
  });

  const handleDelete = async () => {
    // Validate student ID
    if (
      !studentId ||
      typeof studentId !== 'string' ||
      studentId.trim() === ''
    ) {
      alert('Invalid student ID. Cannot delete student.');
      console.error('Invalid student ID:', studentId);
      return;
    }

    if (window.confirm('Are you sure you want to delete this student?')) {
      console.log('Attempting to delete student with ID:', studentId);
      console.log('Student ID type:', typeof studentId);
      console.log('Student ID length:', studentId.length);
      console.log('Variables being sent:', { _id: studentId });

      try {
        const result = await deleteStudent({
          variables: {
            _id: studentId,
          },
        });
        console.log('Delete mutation result:', result);
        console.log('Student deleted successfully');
        alert('Student deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error message:', error.message);
        console.error('Error details:', error.graphQLErrors);
        console.error('Network error:', error.networkError);

        if (error.networkError) {
          console.error('Network error status:', error.networkError.statusCode);
          console.error('Network error response:', error.networkError.result);

          // Log the full error response for debugging
          if (error.networkError.result) {
            console.error(
              'Full network error result:',
              JSON.stringify(error.networkError.result, null, 2)
            );
          }
        }

        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          console.error(
            'GraphQL errors:',
            error.graphQLErrors.map(err => ({
              message: err.message,
              locations: err.locations,
              path: err.path,
              extensions: err.extensions,
            }))
          );
        }

        // Provide more specific error messages based on the error type
        let errorMessage = 'Unknown error occurred';

        if (error.networkError && error.networkError.statusCode === 400) {
          const networkResult = error.networkError.result;
          if (
            networkResult &&
            networkResult.errors &&
            networkResult.errors.length > 0
          ) {
            errorMessage = networkResult.errors[0].message;
          } else {
            errorMessage =
              'Bad request - the server could not process the delete request';
          }
        } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        console.error('Final error message to display:', errorMessage);
        alert(`Error deleting student: ${errorMessage}`);
      }
    }
  };

  return (
    <StyledDeleteButton onClick={handleDelete} disabled={loading}>
      <Icon name="trash" />
      {loading ? 'Deleting...' : 'Delete Student'}
    </StyledDeleteButton>
  );
};

StudentDelete.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default StudentDelete;
