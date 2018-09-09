import React, { Component } from 'react';
import firebase from "firebase";
import PropTypes from 'prop-types';
import * as routes from "../constants/routes";
import {
  withRouter
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
//import Paper from "material-ui/Paper";
//import {cyan300, pink200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';


const paperStyles = {maxWidth:430, padding:50 };


  //const fieldStyle = {
    
   // marginTop:1
    
 // };

class JoinTeam extends Component {
  
  
  constructor(props) {
      super(props);
      this.state = {teamSecret: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({teamSecret: event.target.value})
    }

    handleSubmit(event) {
      this.joinTeam();
      event.preventDefault();
    }

    
    joinTeam(){
      
     this.checkTeam().then((team)=>{
       console.log(team);
      
       
       if(team){
       
       firebase.database().ref("teams/"+team.key+"/teamMembers/"+this.context.authUser.uid).update({name:this.context.userInfo.name});
       firebase.database().ref("users/"+this.context.authUser.uid).update({team:team.key})
        return true
       }
       
       else {
         
         return false
         
       }
       
      
     }).then((ans)=>{
       
       if(ans){
      alert("Joined successfully!");
       this.props.history.push(routes.HOME)
       }
       
       else {
         
         alert("Team does not exist or is full.");
         
       }
       
     })
      
    }
    
    checkTeam(){
      
     return firebase.database().ref("teams/").once("value").then(snapshot=>{
        
        
      let team = false;
      
        snapshot.forEach(teamData=>{
          const data =  teamData.val()
          if(Object.keys(data.teamMembers).length<7){
          
          if(data.teamSecret===this.state.teamSecret){
            
            
            team = {key:teamData.key, teamName:teamData.val().teamName};
          }
          }
          
        })
        
        return team;
        
      })
      
      
    }

    render() {
      return (
        <div >
        <div style={paperStyles}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Team Secret Code
              
            </label><br/>
            <TextField type="text" value={this.state.teamSecret} onChange={this.handleChange}  id="secret"/>
            <br/>
                        
            
            <RaisedButton type="submit" label="Join Team"/>
          </form>
          </div>
      </div>
      );
    }
}



JoinTeam.contextTypes = {
  authUser: PropTypes.object,
  userInfo: PropTypes.object,
};

export default withRouter(JoinTeam);
