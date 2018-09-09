import React, { Component } from 'react';
import ProtectedRoute from "../protectedroute";
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import JoinTeam from "./jointeam.jsx";
import CreateTeam from "./createteam.jsx";
import * as routes from "../constants/routes";
import Paper from "material-ui/Paper";
import {
  withRouter
} from 'react-router-dom';
import { pink200} from 'material-ui/styles/colors';

class Team extends Component {
  
  constructor(props){
   
   super(props);
   
   this.state = {
    
     loading:true
    
   }
   
   
  }
  
   componentDidMount() {
   
   
   
   if(!this.context.userInfo.hasOwnProperty("team")){
    
    console.log(this.context.userInfo)
    this.setState({loading:false});
    
   }
   
   else {
    
     this.setState({loading:true},()=>{
      
     this.props.history.push(routes.HOME)
     
    });
    
    
    
   }
   
  }
  
    render() {
     
     if(this.state.loading){
      
      return(<div>You already have a team!</div>)
      
     }
     
      return (
        
        <div style=
        {{
        display:"flex",
        justifyContent:"center",
        marginTop:50
        
        }}> 
        <Paper>
         <Tabs
           tabItemContainerStyle={{background: pink200}}
           
           
            indicatorColor="secondary"
            textColor="secondary"
            
          
          >
            <Tab label="Join A Team" >
            <JoinTeam/>
            </Tab>
             <Tab label="Create A Team" >
         <CreateTeam/>
         </Tab>
          </Tabs>
          </Paper>
         </div>
      );
    }
}



 Team.contextTypes = {
  authUser: PropTypes.object,
  userInfo: PropTypes.object
};

const authCheck = (authUser) => !!authUser;

export default ProtectedRoute(authCheck)(withRouter(Team));
