import React from 'react';
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

const Header = () => (
  <StyledMenu>
    <Menu.Menu position="left">
      <Menu.Item as="header"></Menu.Item>
    </Menu.Menu>
    <Menu.Menu>
      <Menu.Item as={Link} name="educationelly" to="/">
        educationELLy
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Menu.Item as={Link} name="Register" to="/Signup"></Menu.Item>
      <Menu.Item as={Link} name="Login" to="/Signin"></Menu.Item>
    </Menu.Menu>
  </StyledMenu>
);

export default Header;
