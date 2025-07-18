import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ session }) => (
  <div className="route types" role="navigation">
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = () => (
  <div className="header">
    {/*<Link to="/dashboard">Teacher Dashboard({session.me.username})</Link>*/}
    {/*<Link to="/students">Student List</Link>*/}
  </div>
);

const NavigationNonAuth = () => (
  <div className="Nav-Bar" role="navigation">
    {/*<Link to="/signin">Log In</Link>*/}
    {/*<Link to="/signin">Register</Link>*/}
  </div>
);

Navigation.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

NavigationAuth.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Navigation;
