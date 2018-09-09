import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from "./signoutbutton.jsx";
import PropTypes from 'prop-types';
import * as routes from '../constants/routes';
import AppBar from 'material-ui/AppBar';
import ActionHome from 'material-ui/svg-icons/action/home';
import {cyan50, cyan200} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

const iconStyles = {
  
  margin:10
  
};

const buttonStyles = {
  
  marginTop:5
  
};

const NavBar = (props, { authUser }) =>
  <div>
  { authUser
        ? <NavigationAuth />
        
        : <NavigationNonAuth />
    }
  </div>
  
 NavBar.contextTypes = {
  authUser: PropTypes.object,
};






const NavigationAuth = () =>
  
  <AppBar title="Scavenger Hunt"  iconElementLeft={
    
    <Link to={routes.HOME}  > <ActionHome style={iconStyles} color={cyan50} hoverColor={cyan200}/>
    </Link>
    
  } iconElementRight={
    
     
      <SignOutButton style={buttonStyles}/>
  
  }/>
  
  

const NavigationNonAuth = () =>
    <AppBar title="Scavenger Hunt"  iconElementLeft={
    
     <Link  to={routes.LANDING}>
     <ActionHome style={iconStyles} color={cyan50} hoverColor={cyan200}/>
     </Link>
    
  } iconElementRight={
    
      
     <Link to={routes.SIGN_IN}>
     <RaisedButton style={buttonStyles} label="Sign In" />
     </Link>
 
  }/>
    



export default NavBar;