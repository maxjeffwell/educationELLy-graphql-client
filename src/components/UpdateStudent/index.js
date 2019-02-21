import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Field, reduxForm } from 'redux-form';
import { Form, Icon, Button } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import history from '../../constants/history';

const StyledForm = styled(Form)`
  &&& .ui.labeled.input:not([class*="corner labeled"]) 
  .label:first-child+input {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: 700;
    color: ${props => props.theme.blue};
    padding: 5px 5px 5px 10px;
    background-color: ${props => props.theme.white};
    border-top: 2px solid ${props => props.theme.green};
    border-right: 2px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
  }
  &&& .ui.label {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    width: 50px;
    text-align: center;
  }
  &&& .ui.button {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.blue}; 
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 10px;
  }
`;

const StyledErrorMessage = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const UPDATE_STUDENT = gql`
  mutation($input: UpdateStudentInput!) {
      updateStudent(input: $input) {
          Student {
              id
          }
      }
  }
`;

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { initialValues: null }
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, updateStudent) => {
    updateStudent().then(async ({ data }) => {
      this.setState({ data });

      await this.props.refetch();
      history.push('/students');
    });
    event.preventDefault();
  };

  render() {
    const {
      fullName, school, teacher, dateOfBirth, gender, race, gradeLevel, nativeLanguage,
      cityOfBirth, countryOfBirth, ellStatus, compositeLevel, active, designation
    } = this.state;

    return (
      <Mutation mutation={UPDATE_STUDENT} variables={{
        fullName,
        school,
        teacher,
        dateOfBirth,
        gender,
        race,
        gradeLevel,
        nativeLanguage,
        cityOfBirth,
        countryOfBirth,
        ellStatus,
        compositeLevel,
        active,
        designation
      }}>
        {(updateStudent, {data, loading, error}) => (

          <StyledForm onSubmit={event => this.onSubmit(event, updateStudent)}>

            <Field name="fullName" component={LabelInputField}
                   label={{content: <Icon color="green" name="student" size="large"/>}}
                   labelPosition="left"
                   placeholder="Student Name"/>

            <Field name="school" component={LabelInputField}
                   label={{content: <Icon color="blue" name="university" size="large"/>}}
                   labelPosition="left"
                   placeholder="School Name"
                   onChange={this.onChange}
            />

            <Field name="teacher" component={LabelInputField}
                   label={{content: <Icon color="orange" name="header" size="large"/>}}
                   labelPosition="left"
                   placeholder="Teacher Name"
                   onChange={this.onChange}
            />

            <Field name="gradeLevel" component={LabelInputField}
                   label={{content: <Icon color="green" name="level up" size="large"/>}}
                   labelPosition="left"
                   placeholder="Grade Level"
                   onChange={this.onChange}
            />

            <Field name="ellStatus" component={LabelInputField}
                   label={{content: <Icon color="blue" name="language" size="large"/>}}
                   labelPosition="left"
                   placeholder="Current ELL Status"
                   onChange={this.onChange}
            />

            <Field name="compositeLevel" component={LabelInputField}
                   label={{content: <Icon color="orange" name="bullseye" size="large"/>}}
                   labelPosition="left"
                   placeholder="Composite Level"
                   onChange={this.onChange}
            />

            <Field name="designation" component={LabelInputField}
                   label={{content: <Icon color="green" name="certificate" size="large"/>}}
                   labelPosition="left"
                   placeholder="Current Designation"
                   onChange={this.onChange}
            />

            <Button>Update</Button>

            <StyledErrorMessage>
              {error && <ErrorMessage error={error}/>}
            </StyledErrorMessage>

          </StyledForm>
        )}
      </Mutation>
    );
  }}


export default reduxForm({form: 'UpdateStudent', fields: ['fullName', 'school', 'teacher', 'gradeLevel', 'ellStatus', 'compositeLevel', 'designation']})(UpdateStudent);
