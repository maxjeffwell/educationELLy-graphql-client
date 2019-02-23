import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import history from '../../constants/history';
import { Field, reduxForm } from 'redux-form';
import { LabelInputField } from 'react-semantic-redux-form';
import { StyledForm } from '../UpdateStudent';

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const CREATE_STUDENT_MUTATION = gql`
  mutation CREATE_STUDENT_MUTATION($input: NewStudentInput!){
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
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_STUDENT_MUTATION} variables={this.state}>
        {(createStudent, { loading, error }) => (

          <StyledForm onSubmit={async event => {
            event.preventDefault();
            const res = await createStudent();
            console.log(res);
            history.push({
              pathName: '/student',
              query: {id: res.data.createStudent.id},
            })
          }}
          >

            <fieldset disabled={loading} aria-busy={loading}>

              <input type="text" id="student" name="student" placeholder="Student Name"
                     value={this.state.fullName} onChange={this.onChange}
                     />


            {/*<Field name="fullName" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="green" name="student" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Student Name"*/}
                   {/*// defaultValue={data.student.fullName}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

            <input type="text" id="school" name="school" placeholder="School Name"
                   value={this.state.school} onChange={this.onChange}
                   />

            {/*<Field name="school" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="blue" name="university" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="School Name"*/}
              {/*// defaultValue={data.student.school}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

            <input type="text" id="teacher" name="teacher" placeholder="Teacher Name"
                   value={this.state.teacher} onChange={this.onChange}
                   />

            {/*<Field name="teacher" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="orange" name="header" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Teacher Name"*/}
              {/*// defaultValue={data.student.teacher}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

              <input type="text" id="gradeLevel" name="gradeLevel" placeholder="Grade Level"
                     value={this.state.gradeLevel} onChange={this.onChange}
              />

            {/*<Field name="gradeLevel" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="green" name="level up" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Grade Level"*/}
              {/*// defaultValue={data.student.gradeLevel}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

              <input type="text" id="ellStatus" name="ellStatus" placeholder="ELL Status"
                     value={this.state.ellStatus} onChange={this.onChange}
              />

            {/*<Field name="ellStatus" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="blue" name="language" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Current ELL Status"*/}
              {/*// defaultValue={data.student.ellStatus}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

              <input type="text" id="compositeLevel" name="compositeLevel" placeholder="Composite Level"
                     value={this.state.compositeLevel} onChange={this.onChange}
              />

            {/*<Field name="compositeLevel" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="orange" name="bullseye" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Composite Level"*/}
              {/*// defaultValue={data.student.compositeLevel}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

              <input type="text" id="designation" name="designation" placeholder="Current Designation"
                     value={this.state.designation} onChange={this.onChange}
              />

            {/*<Field name="designation" component={LabelInputField}*/}
                   {/*label={{ content: <Icon color="green" name="certificate" size="large"/> }}*/}
                   {/*labelPosition="left"*/}
                   {/*placeholder="Current Designation"*/}
              {/*// defaultValue={data.student.designation}*/}
                   {/*onChange={this.onChange}*/}
            {/*/>*/}

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

// export default reduxForm({form: 'CreateStudent', fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation']})(CreateStudent);

export default CreateStudent;

export { CREATE_STUDENT_MUTATION };
