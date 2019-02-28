import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../Error';
import { GET_ALL_STUDENTS_QUERY } from '../Students';

const DELETE_STUDENT_MUTATION = gql`
    mutation DELETE_STUDENT_MUTATION($id: ID!) {
        deleteStudent(_id: $id)
    }
`;

const StudentDelete = ({ _id }) => (
  <Mutation
    mutation={DELETE_STUDENT_MUTATION}
    variables={ _id }
    update={cache => {
      const data = cache.readQuery({
        query: GET_ALL_STUDENTS_QUERY,
      });

      cache.writeQuery({
        query: GET_ALL_STUDENTS_QUERY,
        data: {
          ...data,
          students: {
            ...data.students,
          }
        }
    });
  }}
  >
    {(deleteStudentMutation, { data, loading, error }) => {

      if (error) return <ErrorMessage error={error}/>;

      return <button type="button" onClick={deleteStudentMutation}>
        Delete Student
      </button>
    }}
  </Mutation>
);

export default StudentDelete;
