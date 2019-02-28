import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ session }) => (
  <div className="route types" role="navigation">
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = ({ session }) =>
  <div className="header">
      <Link to="/dashboard">Teacher Dashboard({session.me.username})</Link>
      <Link to="/students">Student List</Link>
  </div>;

const NavigationNonAuth = () =>
  <div className="Nav-Bar" role="navigation">
      <Link to="/signin">Log In</Link>
    <Link to="/signin">Register</Link>
  </div>;

export default Navigation;
