import React, { Component } from 'react';
import firebase from "firebase";
import CircularProgress from 'material-ui/CircularProgress';
import {
  withRouter
} from 'react-router-dom';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import {cyan500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
//mport TextField from 'material-ui/TextField';
//import {grey600} from 'material-ui/styles/colors';
//import SvgIcon from 'material-ui/SvgIcon';

import * as routes from "../constants/routes";


const paperStyles = {maxWidth:430, padding:50 };
const paperContainerStyles = {
    marginTop:100,
    display:"flex",
    justifyContent:"center"};


  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
  'hd': 'share.epsb.ca'
});
  
class SignUp extends Component {
  
  
  constructor(props) {
      super(props);
      this.state = {name:'', email: '', pass: '', passr: '', errorMessage:"", waiting:false};

      //this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.createUser = this.createUser.bind(this);
    }


  createUser(id, name){
    
 const ref = firebase.database().ref(`users/${id}`);
 
 ref.once("value").then((snapshot)=>{
   return snapshot.val()
  }).then((data)=>{
    console.log(data)
    if(!!!data){
     ref.set({
    name
    }).then(()=>{
      this.props.history.push(routes.TEAM);
    })}
    
    else {
       this.props.history.push(routes.HOME);
    }
    
  });
  
 
  
  
  
}

    /*handleChange(event) {
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
    }*/


    handleSubmit(event) {
        
        this.setState({waiting:true})
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
 
  // The signed-in user info.
  const user = result.user;
 return user;
 
}).then((user)=>{
    
     this.props.history.push(routes.HOME)
    
}).catch(function(error) {
  // Handle Errors here.
  
  const errorMessage = error.message;
  // The email of the user's account used.
 console.log(errorMessage)
  // ...
});
      event.preventDefault();
    }

    render() {
      return (
        <div style={paperContainerStyles}>
        <Paper style={paperStyles}>
          <form onSubmit={this.handleSubmit}>
            
            {
                this.state.waiting?<div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress /></div>:
             <Button  style={{backgroundColor:cyan500, color:"white"}} type="submit" variant="raised"><SchoolIcon style={{marginRight:10, color:"white"}}/>
             Sign in with schoolzone</Button>
             
            }
          </form>
           <div>{this.state.errorMessage}</div>
           <br/>
         
         </Paper>
      </div>
      );
    }
}

export default withRouter(SignUp);
