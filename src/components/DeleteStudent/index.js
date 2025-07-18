import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';

import { GET_ALL_STUDENTS_QUERY } from '../Students';

const DELETE_STUDENT_MUTATION = gql`
  mutation ($_id: ID!) {
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
      } catch (error) {
        // Handle error silently or show user notification
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete Student'}
    </button>
  );
};

StudentDelete.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default StudentDelete;
