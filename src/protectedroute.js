import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import firebase from "firebase";
import * as routes from "./constants/routes";

const ProtectedRoute = (authCheck) => (Component) => {
  class ProtectedRoute extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        if (!authCheck(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }
    
   

    render() {
      return this.context.authUser ? <Component /> : null;
    }
  }

  ProtectedRoute.contextTypes = {
    authUser: PropTypes.object,
  };

  return withRouter(ProtectedRoute);
}

export default ProtectedRoute;