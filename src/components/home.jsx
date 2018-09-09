import React, { Component } from 'react';
import TeamProfile from "./teamprofile.jsx";
import ScavengerHunt from "./scavengerhunt.jsx";
import firebase from "firebase";
import ProtectedRoute from "../protectedroute";
import Paper from "material-ui/Paper";
import PropTypes from 'prop-types';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import CircularProgress from 'material-ui/CircularProgress';
import Feed from "./feed.jsx";
import MapsIcon from "material-ui/svg-icons/maps/map";
import FeedIcon from "material-ui/svg-icons/communication/rss-feed";
import LeaderboardIcon from "material-ui/svg-icons/av/equalizer";
 import {
  withRouter
} from 'react-router-dom';

import moment from "moment";
import * as routes from "../constants/routes";
import Leaderboard from "./leaderboard.jsx";
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      showFeed:false,
      leaderboard:false,
      showChallenges:true,
      loading:true,
      user:"",
      team:{teamName:"", rank:"2", teamMates:[]},
      challenges:[{clue:"", teamsCompleted:{fef:{completed:""}}, key:""}]
      
    }
  }
  
  getUser(){
    
    
    const userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then((snapshot)=> {
   const user = snapshot.val();
 
  //this.setState({user})
   return user
  
    }).then(user=>{
    this.setState({user},()=>{
     this.getTeam()
    })
    
    
  });
  
  
  
  
  
  
    

  }
  
  getThaTime(){
   
   const ref = firebase.database().ref("/time");
   
   ref.set({time:firebase.database.ServerValue.TIMESTAMP}).then(()=>
    ref.once('value').then((snapshot)=> {
   const time = snapshot.val();
 
  //this.setState({user})
   this.setState({time}, ()=>{this.getUser();console.log(this.state.time)})
  console.log(this.state.time)
    
    
  })
    
    );
   
   
  
   
  }
  
  getTeam(){
   
      //;console.log(this.state.user)
      let newTeam = JSON.parse(JSON.stringify(this.state.team));
   if(this.state.user.hasOwnProperty("team")){   
  firebase.database().ref("/teams/"+this.state.user.team).child("teamName").once("value").then((snapshot)=> {
   
   
   
   const data = snapshot.val();
 
  //this.setState({user})
  
  if(data){
  
   return data;
  }
  
 
  
    })
    .then(teamName=>{
        
        
        
        newTeam.teamName = teamName;
        
    });
    
    
    firebase.database().ref("/teams/"+this.state.user.team).child("teamSecret").once("value").then((snapshot)=> {
   const data = snapshot.val();
 
  //this.setState({user})
  
   return data;
  
    })
    .then(teamSecret=>{
        
        
        
        newTeam.teamSecret = teamSecret;
        
    });
    
    
    
    firebase.database().ref("/teams/"+this.state.user.team+"/teamMembers").on("value",snapshot=>{
        
        let members = [];
        
        snapshot.forEach((mem)=>{
            
            members.push(mem.val().name);
            
            
        })
        
       
   
        newTeam.teamMates = members;
         
    })
    
    //console.log(this.state)
    firebase.storage().ref("teams/"+this.state.user.team).getDownloadURL().then(url=>{
     
     // console.log(url)
      newTeam.url = url;
      
      firebase.database().ref("teamScores/"+this.state.user.team).on("value", snap=>{
    
    
     newTeam.teamScore = snap.val()?snap.val():0;
    
     this.setState({team:newTeam}, ()=>{
       this.getChallenges();
      });
    
   })
     
     
    })
   }
   
   else {
    
   
   this.props.history.push(routes.TEAM);
   
  
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
  
  if(this.context.authUser){
  this.getThaTime();
  this.getUser(); 
  
  }
  else {
   this.setState({loading:true})
  }
  
 
 
 }
 
 componentWilUnmount(){
     
     firebase.database().goOffline()
     
 }
 
  render() {
   
   if(this.state.loading){
    
    return(<div style={{height:"100vh", width:"100%",display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress /></div>)
    
   }
  
    return (
      <Paper style={{display:"flex",flexDirection:"column",alignItems:"center", marginLeft:10, marginRight:10, padding:5}} >
      <h2>
       Welcome {this.state.user.name}
       </h2>
       
       
       <TeamProfile challenges={this.state.challenges.length} team={this.state.team}/>
       
     
       
        <BottomNavigation style={{marginTop:20, height:70, marginBottom:20}}>
         <BottomNavigationItem
            
            label={this.state.showChallenges?"Hide Challenges":"Show Challenges"}
            icon={<MapsIcon/>}
            onClick={() => this.setState({showChallenges:!this.state.showChallenges, leaderboard:false, showFeed:false})}
          />
        <BottomNavigationItem
            
            label={this.state.showFeed?"Hide Feed":"Show Feed"}
            icon={<FeedIcon/>}
            onClick={() => this.setState({showFeed:!this.state.showFeed,showChallenges:false, leaderboard:false})}
          />
          
         <BottomNavigationItem
           
            label={this.state.leaderboard?"Hide Leaderboard":"Show Leaderboard"}
            icon={<LeaderboardIcon/>}
            onClick={() => this.setState({leaderboard:!this.state.leaderboard,showChallenges:false, showFeed:false})}
          />
          
         
         
         </BottomNavigation>
      

<Collapse timeout="auto" in = {this.state.showChallenges}>
<Typography align="center" gutterBottom variant="title">Challenges</Typography>
<hr style={{width:140}}/>
<ScavengerHunt style={{marginTop:20}} teamName={this.state.team.teamName} team={this.state.user.team} challenges={this.state.challenges}/>
<BottomNavigation  style={{marginTop:20, height:70, marginBottom:20}}>
         <BottomNavigationItem
            label={this.state.showChallenges?"Hide Challenges":"Show Challenges"}
            icon={<MapsIcon/>}
            onClick={() => this.setState({showChallenges:!this.state.showChallenges, leaderboard:false, showFeed:false})}
          />
        <BottomNavigationItem
            label={this.state.showFeed?"Hide Feed":"Show Feed"}
            icon={<FeedIcon/>}
            onClick={() => this.setState({showFeed:!this.state.showFeed,showChallenges:false, leaderboard:false})}
          />
          
         <BottomNavigationItem
            label={this.state.leaderboard?"Hide Leaderboard":"Show Leaderboard"}
            icon={<LeaderboardIcon/>}
            onClick={() => this.setState({leaderboard:!this.state.leaderboard,showChallenges:false, showFeed:false})}
          />
          
         
         
         </BottomNavigation>
         
</Collapse>
<Collapse
 in={this.state.leaderboard}
 timeout="auto"
>
 
       
       
       
       <div>
      <Typography align="center" gutterBottom variant="title">Leaderboard</Typography>
      <hr style={{width:140}}/>
       <Leaderboard team={this.state.user.team}/>
         </div>
       
       
  
</Collapse>

<Collapse
  in={this.state.showFeed}
  timeout="auto"
>

 
       
       
       
       <div>
      <Typography align="center" gutterBottom variant="title">Feed</Typography>
      <hr style={{width:140}}/>
       <Feed challenges={this.state.challenges}/>
       
         </div>
       
       
  
</Collapse>
       
       
      </Paper>
    );
 
  
}
}

 Home.contextTypes = {
  authUser: PropTypes.object,
};

const authCheck = (authUser) => !!authUser;

export default ProtectedRoute(authCheck)(withRouter(Home));
