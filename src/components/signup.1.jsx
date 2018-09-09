import React, { Component } from 'react';
import firebase from "firebase";
import {
  withRouter, Link
} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey600} from 'material-ui/styles/colors';


import * as routes from "../constants/routes";


const paperStyles = {maxWidth:430, padding:50 };
const paperContainerStyles = {
    marginTop:100,
    display:"flex",
    justifyContent:"center"};


  const fieldStyle = {
    
    marginTop:1
    
  };
  
class SignUp extends Component {
  
  
  constructor(props) {
      super(props);
      this.state = {name:'', email: '', pass: '', passr: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


  createUser = (id, name) =>
  firebase.database().ref(`users/${id}`).set({
    name
  });

    handleChange(event) {
        if(event.target.id==="mail"){
      this.setState({email: event.target.value})}
        else if(event.target.id==="pass"){
      this.setState({pass: event.target.value})}
       else if(event.target.id ==="passr"){
            this.setState({passr: event.target.value});
       }
       else {
         this.setState({name:event.target.value});
       }
    }

    handleSubmit(event) {
        
      this.state.pass!==this.state.passr?alert("Password does not match"):
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then(authUser => {
          
          this.createUser(authUser.uid, this.state.name)
          .then(()=>{  
        this.setState({email: '', pass: '', passr: ''});
        this.props.history.push(routes.TEAM)})
        .catch(error => {
          console.log(error);
          });
        
      })
        .catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
 
  const errorMessage = error.message;
   this.setState({name:"", passr: '',email: '', pass: '', errorMessage});

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
          <div style={fieldStyle} >
          <label style={{color:grey600}}>
              Name
            </label>
            <br/>
            
              
            <TextField
            required
                id="name"
                label="Name"
                
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
               />
               
            </div>
            <br/>
            <div style={fieldStyle} >
            <label style={{color:grey600}}>
              Email
              
            </label>
            <br/>
            
            <TextField
            required
          id="mail"
          label="Email"
          
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />
            
             </div>
            <br/>
            <div style={fieldStyle} >
            <label style={{color:grey600}}>
              Password
            </label>
            <br/>
               <TextField
               required
          type="password"
          label="Password"
          id="pass"
          value={this.state.pass}
          onChange={this.handleChange}
          margin="normal"
        />
             </div>
            <br/>
            <div style={fieldStyle} >
            <label style={{color:grey600}}>
              Re-enter Password
              
            </label>
            <br/>
             <TextField
             required
          type="password"
          label="Password"
          id="passr"
          value={this.state.passr}
          onChange={this.handleChange}
          margin="normal"
        />
             </div>
            <br/>
            
             <RaisedButton label="Sign Up" secondary={true} type="submit"/>
            
          </form>
           <div>{this.state.errorMessage}</div>
           <br/>
         <Link to={routes.SIGN_IN}>Sign in instead</Link>
         </Paper>
      </div>
      );
    }
}

export default withRouter(SignUp);
