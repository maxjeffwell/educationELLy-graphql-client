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
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent({
          variables: { _id: studentId },
        });
        console.log('Student deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error message:', error.message);
        console.error('Error details:', error.graphQLErrors);
        console.error('Network error:', error.networkError);
        alert(`Error deleting student: ${error.message}`);
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
