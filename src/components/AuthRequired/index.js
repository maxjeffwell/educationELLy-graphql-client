// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
// import history from '../../constants/history';
//
// export default ChildComponent => {
//   class ComposedComponent extends Component {
//     componentDidMount() {
//       this.shouldNavigateAway();
//     }
//     componentDidUpdate() {
//       this.shouldNavigateAway();
//     }
//     shouldNavigateAway() {
//       if (!this.props.auth) {
//         history.push('/');
//       }
//     }
//     render() {
//       return <ChildComponent {...this.props} />;
//     }
//   }
//   function mapStateToProps(state) {
//     return { auth: state.auth.authenticated };
//
//   }
//   return connect(mapStateToProps)(ComposedComponent);
// };
