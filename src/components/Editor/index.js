import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';
// import TextareaAutosize from 'react-autosize-textarea';
import gql from 'graphql-tag';

import ErrorMessage from '../Error';
import Loading from '../Loading';

export const TYPE_CODE = gql`
    mutation TypeCodeMutation($body: String!){
        typeCode(code: {body: $body}) {
            body
        }
    }
`;

export const READ_CODE = gql`{
    readCode {
        body
    }
}
`;

export const TYPING_CODE_SUBSCRIPTION = gql`
    subscription {
        typingCode {
            body
        }
    }
`;

// const StyledTextarea = styled(TextareaAutosize)`
//   font-size: ${({ theme }) => theme.textarea.fontSize};
//   border: ${({ theme }) => theme.textarea.border};
//   background-color: ${({ theme }) => theme.textarea.backgroundColor};
//   color: ${({ theme}) => theme.textarea.color};
//   resize: none;
//   box-sizing: border-box;
//   width: 100%;
// `;

const StyledTextarea = styled.textarea`
  width: 75vw;
  height: 50vh;
  border: 1px solid grey;
  margin: 0 auto;
`;

class Editor extends Component {
  updateCode(e, typeCodeMutation) {
    const newCode = e.currentTarget.value;
    typeCodeMutation({ variables: { body: newCode } });
  }

  subscribeToNewCode(subscribeToMore) {
    subscribeToMore({
      document: TYPING_CODE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          readCode: subscriptionData.data.typingCode
        });
      }
    })
  }

  render() {
    return (
        <Query query={READ_CODE}>
          {({ loading, error, data, subscribeToMore }) => {
            this.subscribeToNewCode(subscribeToMore);
            if (loading) return <Loading />;
            if (error) return ErrorMessage;
            return <Mutation mutation={TYPE_CODE}>
              {typeCodeMutation =>
                  <StyledTextarea value={data.readCode.body}
                            onChange={e => this.updateCode(e, typeCodeMutation)} />}
            </Mutation>
          }}
        </Query>
    );
  }
}

export default Editor;
