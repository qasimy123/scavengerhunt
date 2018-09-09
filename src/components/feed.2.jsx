import React, { Component } from 'react';
import {List} from 'material-ui/List';
//import IconButton from 'material-ui/IconButton';

import Divider from '@material-ui/core/Divider';
import { CardHeader,CardActions, CardMedia, CardTitle} from 'material-ui/Card';
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
    
    
    
    
    render(){
        
        return(
            <div style={styles.root}>
            
         <List
      cellwidth={300}
     
      style={styles.gridList}
      >
            
          
             <div>
             {
             
             this.props.challenges.map((clue)=>{
        
        return Object.values(clue.teamsCompleted).map((tile)=>{
            return {...tile, clue:clue.clue, hint:clue.hint};
        })
        
    }).reduce((acc,cur)=>[...acc,...cur]).filter((submission)=>submission.user).sort((submissionA,submissionB)=>{
         
        
       return submissionB.date-submissionA.date;
    }).map((tile) => {
             
             
            
             
             return(
             <div key={tile.teamId+tile.date}>
             
             <div style={{marginTop:5}} >
    <CardHeader
      title={tile.user}
      
      
    />
    <CardMedia
     
    >
      <img src={tile.image} alt="" />
    </CardMedia>
    
    <CardActions>
    
     
     
   
    </CardActions>
    <CardTitle title={tile.hint} subtitle={moment(tile.date).fromNow()} />

    
  </div>
  
     <Divider light/>
  </div>
  
  )
             
        
        
             })
             
      
                 
                 
             }
             
             </div>
        </List>
        </div>
        )
    }
    
    
}

export default Feed;