import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';
// import history from '../../constants/history';

export const StyledForm = styled(Form)`
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

// const SINGLE_STUDENT_QUERY = gql`
//   query SINGLE_STUDENT_QUERY($id: ID) {
//       student(id: $id) {
//           _id
//       }
//   }
// `;

const UPDATE_STUDENT_MUTATION = gql`
  mutation($input: UpdateStudentInput) {
      updateStudent(input: $UpdateStudentInput) {
          input
      }
  }
`;

class UpdateStudent extends Component {
  state = {};

  onChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  // onSubmit = (event, updateStudent) => {
  //   updateStudent().then(async ({ data }) => {
  //     this.setState({ data });
  //
  //     await this.props.refetch();
  //     history.push('/students');
  //   });
  //   event.preventDefault();
  // };

  updateStudent = async (event, updateStudentMutation) => {
    event.preventDefault();
    console.log('Updating Student!!');
    console.log(this.state);
    await updateStudentMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log('Updated!!');
  };

  render() {
    // const {
    //   fullName, school, teacher, gradeLevel, ellStatus, compositeLevel, designation
    // } = this.state;

    // return (
    //
    //   <Query
    //     query={SINGLE_STUDENT_QUERY}
    //     variables={{
    //       id: this.props.id,
    //     }}
    //   >
    //
    //     {({data, loading}) => {
    //       if (loading) return <p>Loading...</p>;
    //       // if (!data.student) return <p>No Student Found for ID {this.props.id}</p>;

          return (

            <Mutation mutation={UPDATE_STUDENT_MUTATION} variables={this.state}>
              {(updateStudent, {data, loading, error}) => (

                <StyledForm onSubmit={event => this.updateStudent(event, updateStudent)}>

                  <input name="fullName"
                         label={{content: <Icon color="green" name="student" size="large"/>}}
                         labelposition="left"
                         placeholder="Student Name"
                         // defaultValue={data.student.fullName}
                         onChange={this.onChange}
                  />

                  <input name="school"
                         label={{content: <Icon color="blue" name="university" size="large"/>}}
                         labelposition="left"
                         placeholder="School Name"
                         // defaultValue={data.student.school}
                         onChange={this.onChange}
                  />

                  <input name="teacher"
                         label={{content: <Icon color="orange" name="header" size="large"/>}}
                         labelposition="left"
                         placeholder="Teacher Name"
                         // defaultValue={data.student.teacher}
                         onChange={this.onChange}
                  />

                  <input name="gradeLevel"
                         label={{content: <Icon color="green" name="level up" size="large"/>}}
                         labelposition="left"
                         placeholder="Grade Level"
                         // defaultValue={data.student.gradeLevel}
                         onChange={this.onChange}
                  />

                  <input name="ellStatus"
                         label={{content: <Icon color="blue" name="language" size="large"/>}}
                         labelposition="left"
                         placeholder="Current ELL Status"
                         // defaultValue={data.student.ellStatus}
                         onChange={this.onChange}
                  />

                  <input name="compositeLevel"
                         label={{content: <Icon color="orange" name="bullseye" size="large"/>}}
                         labelposition="left"
                         placeholder="Composite Level"
                         // defaultValue={data.student.compositeLevel}
                         onChange={this.onChange}
                  />

                  <input name="designation"
                         label={{content: <Icon color="green" name="certificate" size="large"/>}}
                         labelposition="left"
                         placeholder="Current Designation"
                         // defaultValue={data.student.designation}
                         onChange={this.onChange}
                  />

                  <Button type="submit">Updat{loading ? 'ing' : 'e'} Student</Button>

                  <StyledErrorMessage>
                    {error && <ErrorMessage error={error}/>}
                  </StyledErrorMessage>

                </StyledForm>
              )}
            </Mutation>
          );
        // }}
      // </Query>
    // );
  }
}


export default UpdateStudent;

export { UPDATE_STUDENT_MUTATION };
