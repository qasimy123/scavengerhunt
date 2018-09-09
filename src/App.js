import React from 'react';
import * as routes from "./constants/routes"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Admin from "./components/admin.jsx";
import Home from './components/home.jsx';
import SignIn from "./components/googlesignin.jsx";
import SignUp from "./components/signup.1.jsx";
import NavBar from "./components/navbar.jsx";
import Landing from "./components/landing.jsx";
import PasswordForgetPage from "./components/pwd.jsx";
import Team from "./components/team.jsx";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Authenticator from "./authenticator";

const App = () => 
      
    <MuiThemeProvider>
        <Router>
              <div>
              
              <NavBar/>
              
                
                <hr style={{ border: 0, height: 1, backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0))"}} />
                
                   <Route
                exact path={routes.TEAM}
                component={() => <Team />}
              />
               <Route
                exact path={routes.ADMIN}
                component={() => <Admin />}
              />
              <Route
                exact path={routes.SIGN_UP}
                component={() => <SignUp />}
              />
              <Route
                exact path={routes.SIGN_IN}
                component={() => <SignIn />}
              />
              <Route
                exact path={routes.PASSWORD_FORGET}
                component={() => <PasswordForgetPage />}
              />
              <Route
                exact path={routes.HOME}
                component={() => <Home />}
              />
              <Route
                exact path={routes.LANDING}
                component={() => <Landing />}
              />
              
                
              </div>
          </Router>
  </MuiThemeProvider>
    
  


export default Authenticator(App);

  
  