import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import history from '../../constants/history';
import { StyledForm } from '../UpdateStudent';

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const CREATE_STUDENT_MUTATION = gql`
  mutation CREATE_STUDENT_MUTATION($input: NewStudentInput){
    createStudent(input: $input) {
        fullName
        school
        teacher
        gradeLevel
        ellStatus
        compositeLevel
        designation
    }
  }
`;

class CreateStudent extends Component {
  state = {
    fullName: '',
    school: '',
    teacher: '',
    gradeLevel: '',
    ellStatus: '',
    compositeLevel: '',
    designation: ''
  };

  onChange = event => {
    const { name, type, value } = event.target;
    console.log({name, type, value});
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_STUDENT_MUTATION} variables={this.state}>
        {(createStudent, { loading, error }) => (

          <StyledForm onSubmit={async event => {
            // stop form from submitting
            event.preventDefault();
            console.log(this.state);
            // call the mutation
            const res = await createStudent();
            // change to single student page
            console.log(res);
            history.push('/students/id');
          }}
          >
            <StyledError>
              {error && <ErrorMessage error={error}/>}
            </StyledError>
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
            <Button type="submit">Creat{loading ? 'ing' : 'e'} Student</Button>

            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateStudent;

export { CREATE_STUDENT_MUTATION };
