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
    flex-wrap: wrap;
    min-width: 320px;
    height: auto;
  }
  &&& .header {
    background: ${props => props.theme.green};
  }
  &&& a.header.item {
    width: 50px;
    position: absolute;
  }
  &&& a.item {
    font-size: 2em;
    font-weight: bold;
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.green};
    text-align: center;
  }
  &&& header.item {
    background-color: ${props => props.theme.green};
    width: 75px;
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
            Teacher Dashboard({session.me.username})
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
