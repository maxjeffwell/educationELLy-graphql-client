import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';

import Header from '../Header';
import Landing from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Dashboard from '../Dashboard';
import SignOut from '../SignOut';
import Students from '../Students';
import UpdateStudent from '../UpdateStudent';
import CreateStudent from '../CreateStudent';
import withSession from '../Session/withSession';
import Navigation from '../Navigation';

WebFont.load({
  google: {
    families: ['Roboto: 400', 'sans-serif'],
  },
  timeout: 2000,
});

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css?family=Roboto');
  }

html {
  box-sizing: border-box;
  font-size: 14px;
  }

*, *:before, *:after {
		box-sizing: inherit;
	}
	
body {
	padding: 0;
	margin: 0;
	font-size: 1.5rem;
	line-height: 2;
	font-family: Roboto, sans-serif;
	}
`;

const App = ({ session, refetch }) => (
  <BrowserRouter>
    <Container>
      <GlobalStyle />
      <Header session={session} />
      <Navigation session={session} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUpPage refetch={refetch} />} />
        <Route path="/student/update/:studentId" element={<UpdateStudent />} />
        <Route path="/students" element={<Students />} />
        <Route path="/signin" element={<SignInPage refetch={refetch} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/new" element={<CreateStudent />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

App.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
  refetch: PropTypes.func,
};

export default withSession(App);
