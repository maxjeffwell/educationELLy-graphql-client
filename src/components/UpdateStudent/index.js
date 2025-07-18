import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';

export const StyledForm = styled(Form)`
  &&&
    .ui.labeled.input:not([class*='corner labeled'])
    .label:first-child
    + input {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: 700;
    color: ${props => props.theme.blue};
    padding: 5px 5px 5px 10px;
    background-color: ${props => props.theme.white};
    border-top: 2px solid ${props => props.theme.green};
    border-right: 2px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 2px solid ${props => props.theme.green};
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

const UPDATE_STUDENT_MUTATION = gql`
  mutation updateStudent($input: UpdateStudentInput!) {
    updateStudent(input: $input) {
      _id
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

const UpdateStudent = ({ studentId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    teacher: '',
    gradeLevel: '',
    ellStatus: '',
    compositeLevel: '',
    designation: '',
  });

  const [updateStudent, { loading, error }] = useMutation(
    UPDATE_STUDENT_MUTATION
  );

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await updateStudent({
        variables: {
          input: {
            id: studentId,
            ...formData,
          },
        },
      });
      alert('Student updated successfully!');
    } catch (err) {
      // Handle error silently or show user notification
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Input
        name="fullName"
        icon="student"
        iconPosition="left"
        placeholder="Student Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <Form.Input
        name="school"
        icon="university"
        iconPosition="left"
        placeholder="School Name"
        value={formData.school}
        onChange={handleChange}
      />

      <Form.Input
        name="teacher"
        icon="user"
        iconPosition="left"
        placeholder="Teacher Name"
        value={formData.teacher}
        onChange={handleChange}
      />

      <Form.Input
        name="gradeLevel"
        icon="level up"
        iconPosition="left"
        placeholder="Grade Level"
        value={formData.gradeLevel}
        onChange={handleChange}
      />

      <Form.Input
        name="ellStatus"
        icon="language"
        iconPosition="left"
        placeholder="Current ELL Status"
        value={formData.ellStatus}
        onChange={handleChange}
      />

      <Form.Input
        name="compositeLevel"
        icon="bullseye"
        iconPosition="left"
        placeholder="Composite Level"
        value={formData.compositeLevel}
        onChange={handleChange}
      />

      <Form.Input
        name="designation"
        icon="certificate"
        iconPosition="left"
        placeholder="Current Designation"
        value={formData.designation}
        onChange={handleChange}
      />

      <Button type="submit" primary loading={loading}>
        {loading ? 'Updating...' : 'Update Student'}
      </Button>

      <StyledErrorMessage>
        {error && <ErrorMessage error={error} />}
      </StyledErrorMessage>
    </StyledForm>
  );
};

export default UpdateStudent;

export { UPDATE_STUDENT_MUTATION };
