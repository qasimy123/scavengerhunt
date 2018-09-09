import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from "material-ui/Paper";
import {List, ListItem} from "material-ui/List"

class TeamProfile extends Component {
  render() {
    return (
      <Paper style={{maxWidth:330,width:"90%",paddingTop:15, paddingBottom:5}}>
       
       <p style={{textAlign:"center"}}>Your Team</p>
       <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
      
      <Avatar
      style={{objectFit: 'cover'}}
        alt="Team Profile"
       src={this.props.team.url?this.props.team.url:"http://thecatapi.com/api/images/get?format=src&type=jpg"}
        //style={{width:120, height:120}}
        size={220}
      />
      <br/>
     <div style={{textAlign:"center"}}>
      <h2>
       {this.props.team.teamName}
       </h2>
    
       <p>Completed: {(this.props.team.teamScore/5)}/{this.props.challenges}</p>
       
       <div>
       <h3>Team Members</h3>
       
       <List>
       {
           
        this.props.team.teamMates.map(mem=>{
            
            return (<ListItem key={mem}>{mem}</ListItem>);
            
        })   
           
       }
       </List>
       
        <h3 style={{marginTop:15}}>Team Secret Code</h3>
        
       <p>{this.props.team.teamSecret}</p>
       </div>
       </div>
       </div>
       
       
      </Paper>
    );
  }
}

export default TeamProfile;
