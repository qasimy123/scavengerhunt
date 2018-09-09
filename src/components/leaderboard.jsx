import React, {Component} from "react";
import firebase from "firebase";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from 'material-ui/Avatar';
import {cyan50} from 'material-ui/styles/colors';


class Leaderboard extends Component {
    
    
    componentWillMount(){
        this.setState({loading:true}, ()=>{
            
              firebase.database().ref("teams/").once("value").then( (snapshot)=> {
    console.log("hello")
     
    let teams=[]
    snapshot.forEach(team=>{
     
     const TeamObj = {
      teamName:team.val().teamName,
      
      key:team.key
     }
     
     teams.push(TeamObj)
     
    })
console.log("state set")

   
    console.log(teams)
    return teams;
         }
        )
        .then(teams=>teams.map( team => 
        {
        
       
          return firebase.storage().ref("teams/"+team.key).getDownloadURL().then(url=>{
     console.log(url)
      return url}).then((url)=>{
           return firebase.database().ref("teamScores/").child(team.key).once("value").then(snapshot=>{
               return({...team,score:snapshot.val(), url})
           })
      })
        
        
          
                     
                
            
                }) 
      
        ).then(data=>{
           return Promise.all(data)
        }
    
    
    
    
   ).then(data=>{
       const teams = data.sort((a,b)=>{
                    return b.score - a.score;
                })
       
        this.setState({teams, loading:false});
        console.log(teams)
   })
   
  
            
        })
       
        
    }
    
   
    render(){
    
    if(this.state.loading){
        return <div style={{padding:10}}>Loading...</div>
    }
        
        return(
            
            <div style={{width:260,paddingTop:15, paddingBottom:5}}>
            
            <List>{
                
                this.state.teams.map((team,i)=>{
                    let style = {};
                    if (team.key==this.props.team){
                        
                        style = {"backgroundColor":cyan50}
                        
                        
                    }
                    return(
                    
                     <ListItem key={team.key} style={style}>
          <Avatar style={{objectFit: 'cover'}}
        alt="Team Profile"
       src={team.url?team.url:"http://thecatapi.com/api/images/get?format=src&type=jpg"}
        //style={{width:120, height:120}}
        size={60}></Avatar>
          <ListItemText primary={"#"+(i+1)+". "+team.teamName} secondary={"Completed: "+team.score/5} />
                     </ListItem>
                     
                    )
                    
                })
                
            }
       
       
      </List>
               
            </div>            
            )
        
    }
    
}

export default Leaderboard;