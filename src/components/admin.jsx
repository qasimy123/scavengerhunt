import React, { Component } from 'react';

import firebase from "firebase";
import ProtectedRoute from "../protectedroute";

import PropTypes from 'prop-types';
import Feed from "./admin_feed.jsx";

 import {
  withRouter
} from 'react-router-dom';


class Admin extends Component {
  
  constructor(props){
      super(props);
      
      this.state = {
          loading:true
      }
  }
  getChallenges(){
   
   firebase.database().ref("challenges/").on("value", (snapshot)=>{
    
    let challenges=[]
    snapshot.forEach(challenge=>{
     
     const challengeObj = {
      ...challenge.val(),
      key:challenge.key
     }
     
     challenges.push(challengeObj)
     
    })
    
    
    
    
    this.setState({challenges, loading:false});
    
    
    
    
   })
   
   
  }
  
  componentWillMount(){
      
      this.getChallenges()
  }
 
  render() {
  return(<div>
  
  
  {this.state.loading?"loading":
  <Feed challenges={this.state.challenges}/>
  }
  
  </div>)
      
  }
  
}


 Admin.contextTypes = {
  authUser: PropTypes.object,
};

const authCheck = (authUser) => authUser.email=="q.khawaja@share.epsb.ca"?true:false;

export default ProtectedRoute(authCheck)(withRouter(Admin));
