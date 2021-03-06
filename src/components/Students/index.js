import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';
import Loading from '../Loading';
import ErrorMessage from '../Error';

import DeleteStudent from '../DeleteStudent';

const StyledCard = styled(Card)`
  &&& .content {
    overflow: scroll;
  }
  &&& .content .header:not(.ui) {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-size: .75em;
    font-weight: 700;
    padding: 2px;
  }
  &&& .extra {
    height: auto;
  }
  &&& .extra a:not(.ui) {
    font-size: .75em;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.green};
    font-weight: 700;
  }
`;

export const GET_ALL_STUDENTS_QUERY = gql`
    query getAllStudents{
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

class Students extends Component  {

  renderStudentData() {
    return (
      <Query query={GET_ALL_STUDENTS_QUERY}>
        {({data, error, loading}) => {
          if (loading) return <Loading/>;

          if (error) return <ErrorMessage error={error}/>;

          return data.students.map(student => {

            return (
              <StyledCard className="student-card" key={student._id}>
                <Card.Content>
                  <Card.Header>Student: {student.fullName}</Card.Header>
                  <Card.Header>School: {student.school}</Card.Header>
                  <Card.Header>Teacher: {student.teacher}</Card.Header>
                  <Card.Header>Grade: {student.gradeLevel}</Card.Header>
                  <Card.Header>ELL Status: {student.ellStatus}</Card.Header>
                  <Card.Header>Composite Level: {student.compositeLevel}</Card.Header>
                  <Card.Header>Designation: {student.designation}</Card.Header>
                  <Card.Header>Native Language: {student.nativeLanguage}</Card.Header>
                  <Card.Header>Country of Birth: {student.countryOfBirth}</Card.Header>
                  <DeleteStudent />
                </Card.Content>
                <Card.Content extra>
                  <Link to="/student/update">Edit Student Information</Link>
                </Card.Content>
              </StyledCard>
            );
          })
        }}
      </Query>
    );
  }

  render() {
    return (
      <Card.Group itemsPerRow={4}>
        {this.renderStudentData()}
      </Card.Group>
    );
  }
}

export default Students;
