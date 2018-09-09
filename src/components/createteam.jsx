import React, { Component } from 'react';
import firebase from "firebase";
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

//import {cyan300, pink200} from 'material-ui/styles/colors';
import {
  withRouter
} from 'react-router-dom';

import ActionHome from 'material-ui/svg-icons/file/file-upload';
import TextField from 'material-ui/TextField';
import * as routes from "../constants/routes";

const paperStyles = {maxWidth:430, padding:50 };

const styles = {
  uploadButton: {
   padding:10,
   maxWidth:130,
   height:130
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


  //const fieldStyle = {
    
   // marginTop:1
    
  //};
  
class CreateTeam extends Component {
  
  constructor(props) {
      super(props);
      this.state = {teamName: "", teamSecret:"", loading:false, image:""};
      this.handleChange = this.handleChange.bind(this);
      this.handleFileSelect = this.handleFileSelect.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.target.id==="teamName"?
      this.setState({teamName: event.target.value}):
      this.setState({teamSecret:event.target.value});
    }
    
    handleFileSelect(event) {
      
      const file = event.target.files[0];
      
      
    this.setState({file}, ()=>{
      console.log(this.state.file)
      
      
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(file);
        
      
      
    })
    
  }

    createTeam = (name,teamSecret) =>{
    
    if(this.state.file){
      
      if(this.state.teamName){
      
        if(this.state.teamSecret){
          this.setState({loading:true},()=>{
            
            
            firebase.database().ref("teams/").once("value").then(snapshot=>{
        let res = true;
      
        snapshot.forEach(teamData=>{
          
          if(teamData.val().teamSecret==this.state.teamSecret){
            
            
           
           res = false;
          }
          
          
         
          
        })
        
        return res
        
       
        
      }).then((res)=>{
        
        if(res){
          
           
             const id = firebase.auth().currentUser.uid;
    const newTeamRef = firebase.database().ref("teams/").push();
    
    newTeamRef.update({teamName:name, teamSecret})
    
    const member = newTeamRef.child("teamMembers").child(id);
    member.update({name:this.context.userInfo.name})
    
    firebase.database().ref(`users/${id}`).update({team:
   newTeamRef.key
     }).then(()=>{
       
       this.fileUpload(newTeamRef.key);
       
     });
          
        }
        
        else{
        this.setState({loading:false, teamSecret:""})
        alert("Your Team Secret is taken. Please create another team secret ");
        }
      })
      
      
      
            
           
            
          })
   
        }
        
        else {
          
          alert("Please enter a team secret code")
        
          
        }
      }
      else { 
        
         alert("Please enter a team name")
        
      }
      }
     
     else {
       
       alert("Please upload an image")
       
     }
     
    }

    handleSubmit(event) {
      this.createTeam(this.state.teamName, this.state.teamSecret);
      event.preventDefault();
    }
    
    fileUpload (teamId){
       
   firebase.storage().ref('teams/'+teamId)
     .put(this.state.file)
      .then(snap => {
        console.log("uploaded");
        alert("Team created successfully!");
        this.props.history.push(routes.HOME)
       
      })
      .catch(err => console.log(err))
      
      
    }
    
   
    
    /*var user = firebase.auth().currentUser;

// Create a Storage Ref w/ username
var storageRef = firebase.storage().ref(user + '/profilePicture/' + file.name);

// Upload file
var task = storageRef.put(file);*/

    render() {
      
      if(this.state.loading){
        
        return(<div>
        <div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"center"}}><p>Please wait while your team is created..</p><br/><CircularProgress /></div></div>)
        
      }
      
      
      return (
        <div >
        <div style={paperStyles}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Team Name
            </label>
            <br/>
              <TextField id="teamName" type="text" value={this.state.teamName} onChange={this.handleChange} />
            <br/>
            <label>
              Team Secret Code
            </label>
            <br/>
              <TextField id="teamSecret" type="text" value={this.state.teamSecret} onChange={this.handleChange} className="form-control"/>
            <br/>
            
            <div style={{
              display:"flex",
              flexDirection:"column",
             
              marginTop:20
              
            }}>
            
            <label>
              Team Profile Picture
              
            </label>
          
             <FlatButton
                  
                  icon={
                  
                   <Avatar
        alt="Team Profile"
        style={{objectFit: 'cover'}}
        icon={!this.state.image?
                    <ActionHome/>:null}
       src={this.state.image?this.state.image:
                    null}
        //style={{width:120, height:120}}
        size={120}
        id="target"
      />}
                  style={styles.uploadButton}
                  containerElement="label"
                >
                
                  
    
      <input type="file" accept="image/*" onChange={this.handleFileSelect} style={styles.uploadInput} />
    </FlatButton>
    
    
    
            </div>
            
            <br/>
            
            <RaisedButton type="submit" label="Create a Team"/>
          </form>
          </div>
      </div>
      );
    }
}


CreateTeam.contextTypes = {
  userInfo: PropTypes.object,
};

export default withRouter(CreateTeam);
