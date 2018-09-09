import React, { Component } from 'react';
import {List} from 'material-ui/List';
//import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import firebase from "firebase";
import {Card, CardHeader,CardActions, CardMedia, CardTitle} from 'material-ui/Card';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from "material-ui/FlatButton";
import Cancel from "material-ui/svg-icons/content/clear";
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    maxWidth: 430,
    
  },
  uploadButton: {

        width: 306,
        height: "auto",
        boxShadow: "1px 3px 23px -7px rgba(0,0,0,1)"
    },
    uploadInput: {
        cursor: "pointer",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: "100%",
        opacity: 0,
    }
};




class Feed extends Component {
    
/*addLike(){
    
      
    firebase.database().ref("challenges/"+challengeId+"/teamsCompleted/"+teamId).transaction((like)=> {
      if (like) {
        like = like+1;
      }
        else { 
            like = 1;
        }
      return  like;
    });

}
*/


constructor(props) 
    {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.getTeams();
}

getTeams(){
    
    firebase.database().ref("teams/").once("value").then((snapshot)=>{
    
    let teams=[]
    snapshot.forEach(team=>{
    
     
    teams.push(team.key)
     
    })
   
    this.setState({teams});
 return true;
}).then(data=>{
    
       firebase.database().ref("challenges/").once("value").then((snapshot)=>{
        let challenges = [];
     
     snapshot.forEach(challenge=>{
          const challengeObj = {
      ...challenge.val(),
      key:challenge.key
     }
     
     challenges.push(challengeObj)
     
     this.setState({challenges})
     })
     
     return true;
     
}).then(datas=>{
    
    
    console.log(this.state)
    
 
     const teams = JSON.parse(JSON.stringify(this.state.teams))
     
     let newTeams = teams.map(team=>{
        //console.log(team)
        
        let allChallenges = [];
        
        this.state.challenges.forEach(challenge=>{
            
        console.log(challenge)
        
        console.log({data:challenge.teamsCompleted[team]})
        
        if(challenge.teamsCompleted[team]){
        
        allChallenges.push({...challenge.teamsCompleted[team]});
            
        }
        
        })
        
        return allChallenges
        
    });
    
    this.setState({teams:newTeams})
   //this.setState(teams);
   console.log("tt", newTeams)
    
   
})
   
     
 
    
    
        
    });
   
   
   
    
 
 
 
 
}

getPoints(teamId, points) {

        firebase.database().ref("teamScores/" + teamId).transaction(function(completion) {
            if (completion) {
                completion = completion + points;
            } else {
                completion = points;
            }
            return completion;
        });

    }
    
    deleteItem(challengeId, teamId) {
        //fix complete item!!!!!!!!!!!!!!!!!!!
        

        const ref = firebase.database().ref("challenges/" + challengeId + "/teamsCompleted/" + teamId);

        //this.getPoints(teamId, -5)
        this.getPoints(teamId, -5);

        ref.set({
            image: null,
            date: null,
            user: null,
            teamName:null,
            teamId:null
        })

    }

    handleRemove(event){
        console.log(event.target.id)
        const arr = event.target.id.split("<><>");
        const challengeId = arr[0]
        const teamId = arr[1]
       
        this.setState({[challengeId]:""})
        firebase.storage().ref("challenges/" + challengeId+"/"+teamId).delete().then((snap) => {
            this.deleteItem(challengeId, teamId)
            alert("deleted")


        }).catch(err => {
            console.log(err)
        });


        event.preventDefault()


   
        
    }
  
    ComponentDidMount(){
        this.getTeams();
        
    }
    
    render(){
        
        return(
            <div style={styles.root}>
            
         <List
      cellwidth={300}
      style={styles.gridList}
      >
             <Subheader>Feed</Subheader>
             <div>
             {this.props.challenges.map((clue) => {
             
             if(clue.teamsCompleted){
             console.log()
             return Object.values(clue.teamsCompleted).map((tile)=>{
             
             if(tile.user){
             
             return(
             <Card style={{marginTop:5}} >
    <CardHeader
      title={"Completed by "+tile.user}
      
    />
    <CardMedia
     
    >
      <img src={tile.image} alt="" />
    </CardMedia>
    
       
    <CardTitle title="Clue" subtitle={clue.clue} />
<CardActions>

            <form  id={clue.key+"<><>"+tile.teamId}  onSubmit={this.handleRemove} >
             <FlatButton
             style={{float:"right"}}
             id={clue.key} 
                  size="small"
                  secondary={true}
                  icon={
                    <Cancel/>}
                    label={"Remove"}
                  labelPosition="before"
                  containerElement="label"
                >
                <input type="submit" style={styles.uploadInput}/>
    </FlatButton>
            
            </form>
            
            </CardActions>
    
  </Card>
  
  )
             }
        
        
             })
             }
      
                 
                 
             })}
             
             </div>
        </List>
        </div>
        )
    }
    
    
}

export default Feed;