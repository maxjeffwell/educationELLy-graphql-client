import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Card,
  Container,
  Header,
  Input,
  Button,
  Grid,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import DeleteStudent from '../DeleteStudent';
import Dashboard from '../Dashboard/index.js';

const StyledContainer = styled(Container)`
  &&& {
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 2.5em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 30px;
  }
  &&& .icon {
    margin-right: 15px;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledInput = styled(Input)`
  &&& {
    flex: 1;
    min-width: 300px;
  }
  &&& input {
    border: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.1em;
    padding: 12px;
  }
`;

const AddButton = styled(Button)`
  &&& {
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.1em;
    padding: 12px 20px;
  }
  &&&:hover {
    background: ${props => props.theme.orange};
    color: ${props => props.theme.blue};
  }
`;

const StyledCard = styled(Card)`
  &&& {
    border: 3px solid ${props => props.theme.green};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-bottom: 20px;
  }
  &&&:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  &&& .content {
    padding: 20px;
    background: ${props => props.theme.white};
  }
  &&& .header.student-name {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 2px solid ${props => props.theme.orange};
    padding-bottom: 8px;
  }
  &&& .meta {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: 0.9em;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  &&& .meta .label {
    font-weight: bold;
    min-width: 100px;
    color: ${props => props.theme.green};
  }
  &&& .extra {
    background: ${props => props.theme.white};
    border-top: 2px solid ${props => props.theme.green};
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  &&& .extra a {
    color: ${props => props.theme.green};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    text-decoration: none;
    border: 2px solid ${props => props.theme.green};
    padding: 8px 15px;
    border-radius: 5px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    width: 150px;
    height: 44px;
    justify-content: center;
    box-sizing: border-box;
    white-space: nowrap;
  }
  &&& .extra a:hover {
    background: ${props => props.theme.green};
    color: ${props => props.theme.white};
  }
`;

const StudentCount = styled.div`
  color: ${props => props.theme.blue};
  font-family: 'Roboto', 'sans-serif';
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.orange};
  border-radius: 5px;
`;

export const GET_ALL_STUDENTS_QUERY = gql`
  query getAllStudents {
    students {
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

const Students = React.memo(() => {
  const { data, error, loading } = useQuery(GET_ALL_STUDENTS_QUERY);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  // Filter students based on search term
  const filteredStudents = data.students.filter(
    student =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.ellStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Dashboard />
      <StyledContainer>
        <StyledHeader as="h1">
          <Icon name="users" />
          Student Management
        </StyledHeader>

        <SearchContainer>
          <StyledInput
            icon="search"
            placeholder="Search students by name, school, teacher, grade, or ELL status..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <AddButton as={Link} to="/student/new">
            <Icon name="plus" />
            Add New Student
          </AddButton>
        </SearchContainer>

        <StudentCount>
          {filteredStudents.length} of {data.students.length} students
          {searchTerm && ` matching "${searchTerm}"`}
        </StudentCount>

        <Grid stackable>
          <Grid.Row>
            {filteredStudents.length === 0 ? (
              <Grid.Column width={16}>
                <Card fluid>
                  <Card.Content textAlign="center" style={{ padding: '40px' }}>
                    <Icon name="search" size="big" color="grey" />
                    <Card.Header style={{ marginTop: '20px', color: '#999' }}>
                      {searchTerm
                        ? 'No students found matching your search'
                        : 'No students available'}
                    </Card.Header>
                    <Card.Description style={{ marginTop: '10px' }}>
                      {searchTerm
                        ? 'Try adjusting your search terms'
                        : 'Start by adding your first student'}
                    </Card.Description>
                    {!searchTerm && (
                      <AddButton
                        as={Link}
                        to="/student/new"
                        style={{ marginTop: '20px' }}
                      >
                        <Icon name="plus" />
                        Add New Student
                      </AddButton>
                    )}
                  </Card.Content>
                </Card>
              </Grid.Column>
            ) : (
              filteredStudents.map(student => (
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={6}
                  largeScreen={4}
                  key={student._id}
                >
                  <StyledCard className="student-card">
                    <Card.Content>
                      <Card.Header className="student-name">
                        <Icon name="student" />
                        {student.fullName}
                      </Card.Header>

                      <div className="meta">
                        <span className="label">School:</span>
                        <span>{student.school}</span>
                      </div>

                      <div className="meta">
                        <span className="label">Teacher:</span>
                        <span>{student.teacher}</span>
                      </div>

                      <div className="meta">
                        <span className="label">Grade:</span>
                        <span>{student.gradeLevel}</span>
                      </div>

                      <div className="meta">
                        <span className="label">ELL Status:</span>
                        <span>{student.ellStatus}</span>
                      </div>

                      <div className="meta">
                        <span className="label">Level:</span>
                        <span>{student.compositeLevel}</span>
                      </div>

                      <div className="meta">
                        <span className="label">Language:</span>
                        <span>{student.nativeLanguage}</span>
                      </div>

                      <div className="meta">
                        <span className="label">Country:</span>
                        <span>{student.countryOfBirth}</span>
                      </div>

                      {student.designation && (
                        <div className="meta">
                          <span className="label">Designation:</span>
                          <span>{student.designation}</span>
                        </div>
                      )}
                    </Card.Content>

                    <Card.Content extra>
                      <Link to={`/student/update/${student._id}`}>
                        <Icon name="edit" />
                        Edit Student
                      </Link>
                      <DeleteStudent studentId={student._id} />
                    </Card.Content>
                  </StyledCard>
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      </StyledContainer>
    </>
  );
});

Students.displayName = 'Students';

export default Students;
