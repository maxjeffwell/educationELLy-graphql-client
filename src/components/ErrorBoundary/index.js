import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Message, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 7em;
  text-align: center;
`;

const StyledSegment = styled(Segment)`
  padding: 4em 2em;
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <StyledContainer>
          <StyledSegment>
            <Header as="h1" color="red">
              Oops! Something went wrong
            </Header>
            <Message error>
              <Message.Header>An unexpected error has occurred</Message.Header>
              <p>
                We apologize for the inconvenience. The application has
                encountered an error and needs to be restarted.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details
                  style={{
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left',
                    marginTop: '1em',
                  }}
                >
                  <summary>Error details (development only)</summary>
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </details>
              )}
            </Message>
            <Button primary onClick={this.handleReset}>
              Return to Home
            </Button>
          </StyledSegment>
        </StyledContainer>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
