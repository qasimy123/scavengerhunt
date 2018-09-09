import React, { Component } from 'react';
import {List} from 'material-ui/List';
//import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from '@material-ui/core/Divider';
import {Card, CardHeader,CardActions, CardMedia, CardTitle} from 'material-ui/Card';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import moment from "moment";
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    maxWidth: 430,
    
  },
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
    
    
    componentDidMount(){
        
        let allSubmissions = this.props.challenges.map((clue)=>{
        
        return Object.values(clue.teamsCompleted).map((tile)=>{
            return {...tile, clue:clue.clue, hint:clue.hint};
        })
        
    }).reduce((acc,cur)=>[...acc,...cur]).filter((submission)=>submission.user).sort((submissionA,submissionB)=>{
         
        
       return moment(submissionB.date, "MMMM Do YYYY, h:mm:ss a")-moment(submissionA.date, "MMMM Do YYYY, h:mm:ss a")
    });
    
        console.log(allSubmissions,"dd")
  
  
    }
    
    render(){
        
        return(
            <div style={styles.root}>
            
         <List
      cellWidth={300}
      style={styles.gridList}
      >
            
          
             <div>
             {this.props.challenges.map((clue) => {
             
             if(clue.teamsCompleted){
             console.log()
             return Object.values(clue.teamsCompleted).map((tile)=>{
             
             if(tile.user){
             
             return(
             <div>
             
             <div style={{marginTop:5}} >
    <CardHeader
      title={tile.user}
      subtitle={tile.date}
      
    />
    <CardMedia
     
    >
      <img src={tile.image} alt="" />
    </CardMedia>
    
    <CardActions>
    
     
     
   
    </CardActions>
    <CardTitle title={clue.hint} subtitle={clue.clue} />

    
  </div>
  
     <Divider light/>
  </div>
  
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