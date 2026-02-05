import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import {
  Form,
  Button,
  Dropdown,
  Grid,
  Segment,
  Header,
  Container,
} from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import Loading from '../Loading';
import Dashboard from '../Dashboard/index.js';

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

export const StyledForm = styled(Form)`
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
      await updateStudent({
        variables: {
          _id: studentId,
          input: formData,
        },
      });
      alert('Student updated successfully!');
      navigate('/students');
    } catch (err) {
      alert('Error updating student: ' + err.message);
    }
  };

  if (queryLoading) return <Loading />;
  if (queryError) return <ErrorMessage error={queryError} />;

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
              <StyledHeader as="h1">Edit Student</StyledHeader>

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
                  <Button
                    type="submit"
                    disabled={mutationLoading}
                    primary
                    size="large"
                  >
                    {mutationLoading ? 'Updating...' : 'Update Student'}
                  </Button>
                </div>

                {mutationError && (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <ErrorMessage error={mutationError} />
                  </div>
                )}
              </StyledForm>
            </StyledSegment>
          </Grid.Column>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default UpdateStudent;

export { UPDATE_STUDENT_MUTATION };
