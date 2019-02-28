import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ALL_STUDENTS_QUERY } from '../Students';

const CREATE_STUDENT_MUTATION = gql`
  mutation createStudent($input: NewStudentInput!) {
    createStudent(input: $input) {
        fullName
        school
        teacher
        gradeLevel
        nativeLanguage
        ellStatus
        compositeLevel
        designation
        countryOfBirth
     }
   }
`;

class CreateStudent extends Component {
  state = {
    fullName: '',
    school: '',
    teacher: '',
    gradeLevel: '',
    nativeLanguage: '',
    ellStatus: '',
    compositeLevel: '',
    designation: '',
    countryOfBirth: '',
  };

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { "input": {
      fullName: this.state.fullName,
      school: this.state.school,
      teacher: this.state.teacher,
      gradeLevel: this.state.gradeLevel,
      nativeLanguage: this.state.nativeLanguage,
      ellStatus: this.state.ellStatus,
      compositeLevel: this.state.compositeLevel,
      designation: this.state.designation,
      countryOfBirth: this.state.countryOfBirth,
    }
  },
      refetchQueries: [{ query: GET_ALL_STUDENTS_QUERY }]
    })
      .then(() => this.setState({
        fullName: '', school: '', teacher: '', gradeLevel: '', nativeLanguage: '', ellStatus: '', compositeLevel: '',
        designation: '', countryOfBirth: ''
      })
      )
      .then(() => this.props.history.push('/students'));
  }

  render() {

    return (
      <form onSubmit={this.onSubmit.bind(this)}>

        <input name="fullName"
               type="text"
               value={this.state.fullName}
               placeholder="Student Name"
               onChange={event => this.setState({ fullName: event.target.value })}
        />

        <input name="school"
               type="text"
               value={this.state.school}
               placeholder="School Name"
               onChange={event => this.setState({ school: event.target.value })}
        />

        <input name="teacher"
               type="text"
               value={this.state.teacher}
               placeholder="Teacher Name"
               onChange={event => this.setState({ teacher: event.target.value })}
        />

        <input name="gradeLevel"
               type="text"
               value={this.state.gradeLevel}
               placeholder="Grade Level"
               onChange={event => this.setState({ gradeLevel: event.target.value })}
        />

        <input name="nativeLanguage"
               type="text"
               value={this.state.nativeLanguage}
               placeholder="Native Language"
               onChange={event => this.setState({ nativeLanguage: event.target.value })}
        />

        <input name="ellStatus"
               type="text"
               value={this.state.ellStatus}
               placeholder="Current ELL Status"
               onChange={event => this.setState({ ellStatus: event.target.value })}
        />

        <input name="compositeLevel"
               type="text"
               value={this.state.compositeLevel}
               placeholder="Composite Level"
               onChange={event => this.setState({ compositeLevel: event.target.value })}
        />

        <input name="designation"
               type="text"
               value={this.state.designation}
               placeholder="Current Designation"
               onChange={event => this.setState({ designation: event.target.value })}
        />
        <input name="countryOfBirth"
               type="text"
               value={this.state.countryOfBirth}
               placeholder="Country of Birth"
               onChange={event => this.setState({ countryOfBirth: event.target.value })}
        />

        <Button type="submit">Create Student</Button>
      </form>
  );
  }
}

export default (withRouter)(graphql(CREATE_STUDENT_MUTATION)(CreateStudent));
