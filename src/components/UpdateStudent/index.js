import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import Loading from '../Loading';

export const StyledForm = styled(Form)`
  &&& .field {
    margin-bottom: 20px;
  }
  &&& .field > label {
    font-size: 1.1em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    margin-bottom: 8px;
  }
  &&& .ui.input > input,
  &&& .ui.icon.input > input {
    border: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    font-size: 1.1em;
    font-family: 'Roboto', 'sans-serif';
    padding: 12px;
    padding-left: 45px;
  }
  &&& .ui.icon.input > i.icon {
    color: ${props => props.theme.green};
  }
  &&& .ui.selection.dropdown {
    border: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    font-size: 1.1em;
    font-family: 'Roboto', 'sans-serif';
    padding: 12px;
    min-height: 48px;
  }
  &&& .ui.selection.dropdown .menu {
    border: 2px solid ${props => props.theme.green};
    border-radius: 5px;
  }
  &&& .ui.selection.dropdown .menu > .item {
    font-family: 'Roboto', 'sans-serif';
    padding: 12px !important;
  }
  &&& .ui.selection.dropdown .menu > .item:hover {
    background: ${props => props.theme.green};
    color: ${props => props.theme.white};
  }
  &&& .ui.button {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.3em;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.blue};
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 12px 24px;
    margin-top: 20px;
  }
`;

const StyledErrorMessage = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const GET_STUDENT_QUERY = gql`
  query getStudent($_id: ID!) {
    student(_id: $_id) {
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

const ellStatusOptions = [
  { key: 'active', text: 'Active ELL', value: 'ACTIVE_ELL' },
  { key: 'exited', text: 'Exited', value: 'EXITED' },
  { key: 'monitoring', text: 'Monitoring', value: 'MONITORING' },
  { key: 'never', text: 'Never ELL', value: 'NEVER_ELL' },
  { key: 'refused', text: 'Refused Services', value: 'REFUSED_SERVICES' },
];

const compositeLevelOptions = [
  { key: 'beginning', text: 'Beginning', value: 'BEGINNING' },
  {
    key: 'earlyIntermediate',
    text: 'Early Intermediate',
    value: 'EARLY_INTERMEDIATE',
  },
  { key: 'intermediate', text: 'Intermediate', value: 'INTERMEDIATE' },
  { key: 'earlyAdvanced', text: 'Early Advanced', value: 'EARLY_ADVANCED' },
  { key: 'advanced', text: 'Advanced', value: 'ADVANCED' },
  { key: 'proficient', text: 'Proficient', value: 'PROFICIENT' },
];

const designationOptions = [
  { key: 'ell', text: 'ELL', value: 'ELL' },
  { key: 'rfep', text: 'RFEP', value: 'RFEP' },
  { key: 'ifep', text: 'IFEP', value: 'IFEP' },
  { key: 'eo', text: 'EO', value: 'EO' },
  { key: 'tbd', text: 'TBD', value: 'TBD' },
];

const UPDATE_STUDENT_MUTATION = gql`
  mutation updateStudent($_id: ID!, $input: UpdateStudentInput!) {
    updateStudent(_id: $_id, input: $input) {
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

const UpdateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    teacher: '',
    gradeLevel: '',
    nativeLanguage: '',
    ellStatus: '',
    compositeLevel: '',
    designation: '',
    countryOfBirth: '',
  });

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_STUDENT_QUERY, {
    variables: { _id: studentId },
    skip: !studentId,
  });

  const [updateStudent, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_STUDENT_MUTATION);

  useEffect(() => {
    if (data && data.student) {
      setFormData({
        fullName: data.student.fullName || '',
        school: data.student.school || '',
        teacher: data.student.teacher || '',
        gradeLevel: data.student.gradeLevel || '',
        nativeLanguage: data.student.nativeLanguage || '',
        ellStatus: data.student.ellStatus || '',
        compositeLevel: data.student.compositeLevel || '',
        designation: data.student.designation || '',
        countryOfBirth: data.student.countryOfBirth || '',
      });
    }
  }, [data]);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (e, { name, value }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const result = await updateStudent({
        variables: {
          _id: studentId,
          input: formData,
        },
      });
      console.log('Update result:', result);
      alert('Student updated successfully!');
      console.log('Navigating to /students...');
      navigate('/students');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating student: ' + err.message);
    }
  };

  if (queryLoading) return <Loading />;
  if (queryError) return <ErrorMessage error={queryError} />;

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

      <Form.Field>
        <label htmlFor="ellStatus">ELL Status</label>
        <Dropdown
          id="ellStatus"
          name="ellStatus"
          placeholder="Select ELL Status"
          fluid
          selection
          options={ellStatusOptions}
          value={formData.ellStatus}
          onChange={handleDropdownChange}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="compositeLevel">Composite Level</label>
        <Dropdown
          id="compositeLevel"
          name="compositeLevel"
          placeholder="Select Composite Level"
          fluid
          selection
          options={compositeLevelOptions}
          value={formData.compositeLevel}
          onChange={handleDropdownChange}
        />
      </Form.Field>

      <Form.Input
        name="nativeLanguage"
        icon="world"
        iconPosition="left"
        placeholder="Native Language"
        value={formData.nativeLanguage}
        onChange={handleChange}
      />

      <Form.Field>
        <label htmlFor="designation">Designation</label>
        <Dropdown
          id="designation"
          name="designation"
          placeholder="Select Designation"
          fluid
          selection
          options={designationOptions}
          value={formData.designation}
          onChange={handleDropdownChange}
        />
      </Form.Field>

      <Form.Input
        name="countryOfBirth"
        icon="globe"
        iconPosition="left"
        placeholder="Country of Birth"
        value={formData.countryOfBirth}
        onChange={handleChange}
      />

      <Button type="submit" primary loading={mutationLoading}>
        {mutationLoading ? 'Updating...' : 'Update Student'}
      </Button>

      <StyledErrorMessage>
        {mutationError && <ErrorMessage error={mutationError} />}
      </StyledErrorMessage>
    </StyledForm>
  );
};

export default UpdateStudent;

export { UPDATE_STUDENT_MUTATION };
