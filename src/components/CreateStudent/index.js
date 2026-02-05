import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Container,
  Dropdown,
} from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

import { GET_ALL_STUDENTS_QUERY } from '../Students';
import Dashboard from '../Dashboard/index.js';

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

const StyledContainer = styled(Container)`
  &&& {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const StyledSegment = styled(Segment)`
  &&& {
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 30px;
    background: ${props => props.theme.white};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    margin-bottom: 30px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 2.5em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    padding: 15px;
    border-radius: 5px;
    text-align: center;
  }
`;

const StyledForm = styled(Form)`
  &&& .field {
    margin-bottom: 20px;
  }
  &&& .field > label {
    font-size: 1.2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    margin-bottom: 8px;
  }
  &&& .ui.input > input {
    border: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    font-size: 1.1em;
    font-family: 'Roboto', 'sans-serif';
    padding: 12px;
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
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 1.3em;
    font-family: 'Roboto', 'sans-serif';
    padding: 12px 24px;
    margin-top: 20px;
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

const INITIAL_STATE = {
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

const CreateStudent = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_STUDENTS_QUERY }],
  });
  const navigate = useNavigate();

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
      await createStudent({
        variables: { input: formData },
      });
      setFormData(INITIAL_STATE);
      alert('Student created successfully!');
      setTimeout(() => {
        navigate('/students');
      }, 500);
    } catch (error) {
      // Handle error silently or show user notification
    }
  };

  return (
    <>
      <Dashboard />
      <StyledContainer>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 800 }}>
            <StyledSegment stacked>
              <StyledHeader as="h1">Create New Student</StyledHeader>

              <StyledForm onSubmit={handleSubmit}>
                <Grid stackable>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="fullName">Student Full Name</label>
                        <Form.Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          placeholder="Enter student's full name"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="school">School Name</label>
                        <Form.Input
                          id="school"
                          name="school"
                          type="text"
                          value={formData.school}
                          placeholder="Enter school name"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="teacher">Teacher Name</label>
                        <Form.Input
                          id="teacher"
                          name="teacher"
                          type="text"
                          value={formData.teacher}
                          placeholder="Enter teacher's name"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="gradeLevel">Grade Level</label>
                        <Form.Input
                          id="gradeLevel"
                          name="gradeLevel"
                          type="text"
                          value={formData.gradeLevel}
                          placeholder="Enter grade level"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="nativeLanguage">Native Language</label>
                        <Form.Input
                          id="nativeLanguage"
                          name="nativeLanguage"
                          type="text"
                          value={formData.nativeLanguage}
                          placeholder="Enter native language"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor="countryOfBirth">Country of Birth</label>
                        <Form.Input
                          id="countryOfBirth"
                          name="countryOfBirth"
                          type="text"
                          value={formData.countryOfBirth}
                          placeholder="Enter country of birth"
                          onChange={handleChange}
                          required
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
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
                    </Grid.Column>
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={1}>
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button type="submit" disabled={loading} primary size="large">
                    {loading ? 'Creating Student...' : 'Create Student'}
                  </Button>
                </div>
              </StyledForm>
            </StyledSegment>
          </Grid.Column>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default CreateStudent;
