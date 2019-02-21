import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  &&& {
    font-size: 1.5em;
    font-family: "Roboto", "sans-serif";
    font-weight: bold;
    color: ${props => props.theme.blue};
  }
  `;

const Dashboard = () => (
  <div id="dashboard">
    <Menu.Item>
      <StyledContainer as={Link} name="students" to="/students">
        Access Your Student List
      </StyledContainer>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Document Upload Center Coming Soon</Menu.Header>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Integrated Team Member Messaging Coming Soon</Menu.Header>
    </Menu.Item>
  </div>
);

export default Dashboard;
