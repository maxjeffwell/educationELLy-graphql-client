import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
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
    createStudent(input: $NewStudentInput) {
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
    dateOfBirth: '',
    gender: '',
    race: '',
    gradeLevel: '',
    nativeLanguage: '',
    cityOfBirth: '',
    countryOfBirth: '',
    ellStatus: '',
    compositeLevel: '',
    active: '',
    designation: ''
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation mutation={CREATE_STUDENT_MUTATION} variables={this.state}>
        {(createStudent, { data, loading, error }) => (

          <StyledForm onSubmit={async event => {
            event.preventDefault();
            const res = await createStudent();
            console.log(res);
            history.push({
              pathName: '/student/:id',
              query: {id: res.data.createStudent.id},
            })
          }}>

            <input name="fullName"
                   label={{ content: <Icon color="green" name="student" size="large"/> }}
                   labelposition="left"
                   placeholder="Student Name"
                   onChange={this.onChange}
            />

            <input name="school"
                   label={{ content: <Icon color="blue" name="university" size="large"/> }}
                   labelposition="left"
                   placeholder="School Name"
                   onChange={this.onChange}
            />

            <input name="teacher"
                   label={{ content: <Icon color="orange" name="header" size="large"/> }}
                   labelposition="left"
                   placeholder="Teacher Name"
              // defaultValue={data.student.teacher}
                   onChange={this.onChange}
            />

            <input name="gradeLevel"
                   label={{ content: <Icon color="green" name="level up" size="large"/> }}
                   labelposition="left"
                   placeholder="Grade Level"
                   onChange={this.onChange}
            />

            <input name="ellStatus"
                   label={{ content: <Icon color="blue" name="language" size="large"/> }}
                   labelposition="left"
                   placeholder="Current ELL Status"
                   onChange={this.onChange}
            />

            <input name="compositeLevel"
                   label={{ content: <Icon color="orange" name="bullseye" size="large"/> }}
                   labelposition="left"
                   placeholder="Composite Level"
                   onChange={this.onChange}
            />

            <input name="designation"
                   label={{ content: <Icon color="green" name="certificate" size="large"/> }}
                   labelposition="left"
                   placeholder="Current Designation"
                   onChange={this.onChange}
            />

            <Button type="submit">Creat{loading ? 'ing' : 'e'} Student</Button>

            <StyledError>
              {error && <ErrorMessage error={error}/>}
            </StyledError>

          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateStudent;

export { CREATE_STUDENT_MUTATION };
