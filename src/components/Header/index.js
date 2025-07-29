import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  &&& {
    display: flex;
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    margin-bottom: 25px;
    flex-wrap: nowrap;
    min-width: 320px;
    height: auto;
    overflow-x: auto;
  }
  &&& .header {
    background: ${props => props.theme.green};
  }
  &&& a.header.item {
    width: 50px;
    position: absolute;
  }
  &&& a.item {
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.green};
    text-align: center;
    white-space: nowrap;
    padding: 0.5em 0.8em !important;
  }
  &&& header.item {
    background-color: ${props => props.theme.green};
    width: 75px;
  }

  @media (max-width: 768px) {
    &&& a.item {
      font-size: 1em;
      padding: 0.4em 0.6em !important;
    }
  }

  @media (max-width: 480px) {
    &&& a.item {
      font-size: 0.9em;
      padding: 0.3em 0.4em !important;
    }
  }
`;

const Header = ({ session }) => (
  <StyledMenu>
    <Menu.Menu position="left">
      <Menu.Item as="header"></Menu.Item>
    </Menu.Menu>
    <Menu.Menu>
      <Menu.Item as={Link} name="About educationelly" to="/">
        About Us
      </Menu.Item>
      {session && session.me && (
        <>
          <Menu.Item as={Link} name="Dashboard" to="/dashboard">
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} name="Students" to="/students">
            Student List
          </Menu.Item>
        </>
      )}
    </Menu.Menu>
    <Menu.Menu position="right">
      {session && session.me ? (
        <Menu.Item as={Link} name="Logout" to="/signout">
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item as={Link} name="Register" to="/Signup"></Menu.Item>
          <Menu.Item as={Link} name="Login" to="/Signin"></Menu.Item>
        </>
      )}
    </Menu.Menu>
  </StyledMenu>
);

Header.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

export default Header;
