import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import { StyledForm } from '../UpdateStudent';

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

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

// const CREATE_STUDENT_MUTATION = gql`
//   mutation CREATE_STUDENT_MUTATION($fullname: String, $school: String, $teacher: String, $gradeLevel: String, $ellStatus: String, $compositeLevel: String,
//   $designation: String) {
//     createStudent(fullname: $fullname, school: $school, teacher: $teacher, gradeLevel: $gradeLevel, ellStatus: $ellStatus, compositeLevel:                      $compositeLevel, designation: $designation){
//             _id
//           fullName
//           school
//           teacher
//           gradeLevel
//           nativeLanguage
//           ellStatus
//           compositeLevel
//           designation
//           countryOfBirth
//   }
//   }
// `;

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

  onChange = event => {
    const { name, type, value } = event.target;
    console.log({name, type, value});
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  onSubmit = async (event, createStudent) => {
    event.preventDefault();

    try {
      await createStudent();
      this.setState({ fullName: '', school: '', teacher: '', gradeLevel: '', nativeLanguage: '', ellStatus: '', compositeLevel: '', designation: '', countryOfBirth: '' });
      this.props.history.push('/students');
    } catch (error) {}
  };

  render() {

    return (
      <Mutation mutation={CREATE_STUDENT_MUTATION} variables={this.state}>
        {(createStudent, { data, loading, error }) => (

          <StyledForm onSubmit={event => this.onSubmit(event, createStudent)}
          >
            <fieldset disabled={loading} aria-busy={loading}>

            <input name="fullName"
                   type="text"
                   value={this.state.fullName}
                   placeholder="Student Name"
                   onChange={this.onChange}
            />

            <input name="school"
                   type="text"
                   value={this.state.school}
                   placeholder="School Name"
                   onChange={this.onChange}
            />

            <input name="teacher"
                   type="text"
                   value={this.state.teacher}
                   placeholder="Teacher Name"
                   onChange={this.onChange}
            />

            <input name="gradeLevel"
                   type="text"
                   value={this.state.gradeLevel}
                   placeholder="Grade Level"
                   onChange={this.onChange}
            />

            <input name="nativeLanguage"
                     type="text"
                     value={this.state.nativeLanguage}
                     placeholder="Native Language"
                     onChange={this.onChange}
              />

            <input name="ellStatus"
                   type="text"
                   value={this.state.ellStatus}
                   placeholder="Current ELL Status"
                   onChange={this.onChange}
            />

            <input name="compositeLevel"
                   type="text"
                   value={this.state.compositeLevel}
                   placeholder="Composite Level"
                   onChange={this.onChange}
            />

            <input name="designation"
                   type="text"
                   value={this.state.designation}
                   placeholder="Current Designation"
                   onChange={this.onChange}
            />
            <input name="countryOfBirth"
                     type="text"
                     value={this.state.countryOfBirth}
                     placeholder="Country of Birth"
                     onChange={this.onChange}
              />

              <Button type="submit">Creat{loading ? 'ing' : 'e'} Student</Button>

            </fieldset>
            <StyledError>
              {error && <ErrorMessage error={error}/>}
            </StyledError>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateStudent);

export { CREATE_STUDENT_MUTATION };
