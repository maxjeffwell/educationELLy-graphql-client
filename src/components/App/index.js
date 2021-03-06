import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';

// import Header from '../Header';
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
    families: ['Roboto: 400', 'sans-serif']
  },
  timeout: 2000
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
    {/*<Header />*/}
    <Navigation session={session} />
    <Route exact path='/' component={() => <Landing />} />
    <Route exact path='/signup' component={() => <SignUpPage refetch={refetch} />} />
    <Route path='/student/update/' render={(props) => <UpdateStudent {...props} />} />
    <Route exact path='/students' component={() => <Students />} />
    <Route exact path='/signin' component={() => <SignInPage refetch={refetch} />} />
    <Route exact path='/dashboard' component={() => <Dashboard />} />
    <Route exact path='/student/new' component={() => <CreateStudent />} />
    <Route exact path='/signout' component={() => <SignOut />} />
  </Container>
  </BrowserRouter>
);

export default withSession(App);
