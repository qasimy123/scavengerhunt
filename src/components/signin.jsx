import React, { Component } from 'react';
import firebase from "firebase";
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey600} from 'material-ui/styles/colors';
import {
  withRouter, Link
} from 'react-router-dom';

import * as routes from "../constants/routes";
  
  const paperStyles = {maxWidth:430, padding:50 };
  const paperContainerStyles = {
    marginTop:100,
    display:"flex",
    justifyContent:"center"};
    
  
  const fieldStyles = {
    
    marginTop:1
    
  };
  
class SignIn extends Component {
  
  
  constructor(props) {
      super(props);
      this.state = {email: '', pass: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.target.id==="mail"?
      this.setState({email: event.target.value}):
      this.setState({pass: event.target.value});
    }

    handleSubmit(event) {
      
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
      
      .then(authUser => {
        this.setState({email: '', pass: ''});
        this.props.history.push(routes.HOME);
      }
        
      )
      .catch((error)=> {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  this.setState({email: '', pass: '', errorMessage});

  console.log(errorMessage + errorCode);
  
  // ...
});
     
      
      event.preventDefault();
    }
    
    

    render() {
      return (
        <div style={paperContainerStyles}>
        <Paper style={paperStyles}>
        
          <form onSubmit={this.handleSubmit}>
          <div style={fieldStyles} >
            <label style={{color:grey600}}>
              Email
              
            </label><br/>
            
            <TextField
          id="mail"
          label="Email"
          
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />
            
          </div>
          
            <br/>
            <div style={fieldStyles}>
            <label style={{color:grey600}}>
              Password
              
            </label>
            <br/>
            <TextField
          type="password"
          label="Password"
          
          value={this.state.pass}
          onChange={this.handleChange}
          margin="normal"
        />
            
            </div>
            <br/>
            <div style={fieldStyles}>
            
            
            <RaisedButton primary={true} label="Sign In" type="submit"/>
            </div>
          </form>
          
          <div>{this.state.errorMessage}</div>
          <br/>
         <Link to={routes.SIGN_UP}>Sign up instead</Link>
      </Paper>
      </div>
      );
    }
}

export default withRouter(SignIn);
