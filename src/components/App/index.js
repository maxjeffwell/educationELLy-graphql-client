import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
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
import useSession from '../Session/useSession';
import { ChatBubble } from '../AIChat';

WebFont.load({
  google: {
    families: ['Roboto: 400', 'Arimo: 400,700', 'sans-serif'],
  },
  timeout: 2000,
});

const GlobalStyle = createGlobalStyle`
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

const App = () => {
  const { session, refetch } = useSession();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <Header session={session} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUpPage refetch={refetch} />} />
            <Route
              path="/student/update/:studentId"
              element={<UpdateStudent />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/signin" element={<SignInPage refetch={refetch} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/new" element={<CreateStudent />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </Container>
        <ChatBubble />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
