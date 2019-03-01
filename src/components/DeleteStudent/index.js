import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { GET_ALL_STUDENTS_QUERY } from '../Students';

const DELETE_STUDENT_MUTATION = gql`
    mutation($_id: ID!) {
        deleteStudent(_id: $_id) {
            _id
        }
    }
`;

class StudentDelete extends Component {
  onClick() {
    this.props.deleteStudent({
      variables: { _id: this.cache.Student._id }
    });
    console.log(this.props.student);
  }
  render() {
    return (
      <button onClick={this.onClick.bind(this)}>Delete Student</button>
    );
  }
}

export default graphql(DELETE_STUDENT_MUTATION, {
  options: {
    optimisticResponse: {
      deleteStudent: {
        _id: -1,
        __typename: 'Mutation'
      }
    }, update: {
      query: GET_ALL_STUDENTS_QUERY
    },
}
})(StudentDelete);



