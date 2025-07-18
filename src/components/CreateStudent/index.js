import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

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

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await createStudent({
        variables: { input: formData },
      });
      setFormData(INITIAL_STATE);
      navigate('/students');
    } catch (error) {
      // Handle error silently or show user notification
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        type="text"
        value={formData.fullName}
        placeholder="Student Name"
        onChange={handleChange}
      />

      <input
        name="school"
        type="text"
        value={formData.school}
        placeholder="School Name"
        onChange={handleChange}
      />

      <input
        name="teacher"
        type="text"
        value={formData.teacher}
        placeholder="Teacher Name"
        onChange={handleChange}
      />

      <input
        name="gradeLevel"
        type="text"
        value={formData.gradeLevel}
        placeholder="Grade Level"
        onChange={handleChange}
      />

      <input
        name="nativeLanguage"
        type="text"
        value={formData.nativeLanguage}
        placeholder="Native Language"
        onChange={handleChange}
      />

      <input
        name="ellStatus"
        type="text"
        value={formData.ellStatus}
        placeholder="Current ELL Status"
        onChange={handleChange}
      />

      <input
        name="compositeLevel"
        type="text"
        value={formData.compositeLevel}
        placeholder="Composite Level"
        onChange={handleChange}
      />

      <input
        name="designation"
        type="text"
        value={formData.designation}
        placeholder="Current Designation"
        onChange={handleChange}
      />

      <input
        name="countryOfBirth"
        type="text"
        value={formData.countryOfBirth}
        placeholder="Country of Birth"
        onChange={handleChange}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Student'}
      </Button>
    </form>
  );
};

export default CreateStudent;
