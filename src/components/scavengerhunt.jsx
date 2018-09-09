import React, {
    Component
} from "react";
import firebase from "firebase";
//import * as routes from "../constants/routes";
import CircularProgress from "material-ui/CircularProgress";
import LinearProgress from "material-ui/LinearProgress";
import moment from "moment";
import Subheader from 'material-ui/Subheader';

import {
    List,
    ListItem
} from "material-ui/List";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import UploadButton from "material-ui/svg-icons/image/add-a-photo";
import Cancel from "material-ui/svg-icons/content/clear";
import InfiniteScroll from 'react-infinite-scroller';

import {
    cyan300,
    cyan600
} from "material-ui/styles/colors";

const styles = {
    uploadButton: {
        
        width: 265,
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
}
class ScavengerHunt extends Component {



    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            image: ""
        }
       //this.handleHintUse = this.handleHintUse.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelSubmission = this.cancelSubmission.bind(this);
      
    }
    
    /*handleHintUse(event){
        
        firebase.database().ref("teams/"+this.props.team+"/hints").transaction(function(completion) {
            if (completion) {
                completion = completion + 1;
            } else {
                completion = 1;
            }
            return completion;
        });
        
    }*/

    handleFileSelect(event) {

        const file = event.target.files[0];
        const id = event.target.id

if(file.size<10000000){
        this.setState({
            file
        }, () => {
            console.log(this.state.file)


            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    [id]: e.target.result
                });
            };
            reader.readAsDataURL(file);



        })}
        
        else {
            
            alert("File too big")
            
        }

    }
    
   

    cancelSubmission(event) {

        const challengeId = event.target.id
       
        this.setState({[challengeId]:""})
        firebase.storage().ref("challenges/" + challengeId + "/" + this.props.team).delete().then((snap) => {
            this.deleteItem(challengeId)
            alert("Deleted!")


        }).catch(err => {
            console.log(err)
        });


        event.preventDefault()


    }



    handleSubmit(event) {
        const challengeId = event.target.id
        if (this.state.file) {

            this.setState({
                uploading: true
            }, () => {




                firebase.storage().ref("challenges/" + challengeId + "/" + this.props.team)
                    .put(this.state.file)
                    .then(snap => {

                        this.setState({
                            file: "",
                            uploading: false
                        })


                        this.completeItem(challengeId, snap.downloadURL)

                    })
                    .catch(err => console.log(err))

            })

        } else {
            alert("Please attach an image")
        }

        event.preventDefault()

    }

    completeItem(challengeId, url) {
        //fix complete item!!!!!!!!!!!!!!!!!!!
        const teamId = this.props.team;
        firebase.database().ref("challenges/" + challengeId + "/teamsCompleted/" + teamId).set({
            image: url,
            date: firebase.database.ServerValue.TIMESTAMP,
            user: this.context.userInfo.name,
            teamName: this.props.teamName,
            teamId
        }).then(() => {
            //this.setState({remaining:this.state.remaining-1})

        });

        firebase.database().ref("challenges/" + challengeId + "/teamsCompleted").once("value").then((snapshot) => {
            const length = Object.values(snapshot.val()).length;

            if (length < 3) {

                this.setState({
                    points: 5
                }, () => {

                    this.getPoints(teamId, this.state.points)

                })

            } else {
                this.setState({
                    points: 5
                }, () => {
                    this.getPoints(teamId, this.state.points)
                })
            }

        })




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

    deleteItem(challengeId) {
        //fix complete item!!!!!!!!!!!!!!!!!!!
        const teamId = this.props.team;

        const ref = firebase.database().ref("challenges/" + challengeId + "/teamsCompleted/" + teamId);

        //this.getPoints(teamId, -5)
        this.getPoints(teamId, -5);

        ref.set({
            image: null,
            date: null,
            user: null,
            teamId:null,
            teamName:null
        })

    }


    /*componentWillMount(){
        this.setState({loading:true});
        console.log(this.props.challenges)
        const promises = this.props.challenges.map(challenge=>{
            
            if(challenge.teamsCompleted[this.props.team]){
                
               return firebase.storage().ref("challenges/"+challenge.key+"/"+this.props.team).getDownloadURL().then(url=>{
                    const key = challenge.key
                    this.setState({[key]:url,remaining:this.state.remaining-1});
                    return key
                    
                })
                
                
            }
            
           
            
        })
       
        Promise.all(promises).then(val=>{
            
            return "doneAll"
            
        }).then(()=>{
            console.log(this.state);
            this.setState({loading:false})
            
        })
        
       // loading:false,
        
        
    }
    */

    render() {


        if (this.state.loading) {
            return (
                <div style={{height:"100vh", width:"100%",display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress /></div>

            );
        }




        return (
            <div >
      
      
      
      
      
      <List>
    
      {
          
          this.props.challenges.map(
            (challenge)=>{
            
            
                if(!challenge.teamsCompleted[this.props.team]){
                
                return(
                
                <ListItem key={challenge.key} style={{padding:10, display:"flex", justifyContent:"center"}}>
                <h2 style={{marginRight:20, marginLeft:20,fontSize:"1em",lineHeight:"1.6",textAlign:"center"}}>{challenge.clue}</h2>
                <Subheader style={{textAlign:"center"}} onClick={()=>{
                    alert(challenge.hint);
                }}>Click to Reveal Hint</Subheader>
                
                 <form  style={{display:"flex",flexDirection:"column",
                 alignItems:"center",
             
              marginTop:20}} id={challenge.key}  onSubmit={this.handleSubmit} >
            
            
                    
             <FlatButton
                  
                  style={styles.uploadButton}
                  icon={
                  this.state[challenge.key]?<img alt="submission" style={{width:300, border:"3px solid red"}} src={this.state[challenge.key]}/>:
                    <div style={{width:265, paddingTop:50, paddingBottom:30}}>
                    <UploadButton style={{height:80, width:80}} color={cyan300} hoverColor={cyan600} />
                    </div>
                    }
                 
                  containerElement="label"
                >
                
                  
    
      <input type="file" accept="image/*" id={challenge.key} onChange={this.handleFileSelect} style={styles.uploadInput} />
    </FlatButton>
            
          { 
          this.state[challenge.key]?
                this.state.uploading?<div style={{marginTop:10,height:"auto",width:"265px",display:"flex", justifyContent:"center"}}><LinearProgress mode="indeterminate" /></div>
                :<RaisedButton style={{marginTop:10, width:"265px"}} type="submit" label="Upload"/>:null
              
              
          }
           
            </form>
                
                </ListItem>
                );
                
            }
            else {
                
                return(
                
                <ListItem key={challenge.key} style={{padding:10, display:"flex", justifyContent:"center"}}>
                
                <h2 style={{marginRight:20, marginLeft:20,fontSize:"1em",lineHeight:"1.6",textAlign:"center"}}>{challenge.clue}</h2>
                
                <div style={{paddingLeft:20, paddingRight:20,display:"flex", justifyContent:"space-between"}}>
                    <p> {challenge.teamsCompleted[this.props.team].user}</p>
                    <p>{moment(challenge.teamsCompleted[this.props.team].date).fromNow()}</p> 
                </div>
                
              
               <img alt="photo submission" style={{margin:20,width:265,boxShadow:"1px 3px 23px -7px rgba(0,0,0,1)"}} src={challenge.teamsCompleted[this.props.team].image}/>
               
               
            <form  id={challenge.key}  onSubmit={this.cancelSubmission} >
             <FlatButton
             style={{float:"right"}}
             id={challenge.key} 
                  size="small"
                  secondary={true}
                  icon={
                    <Cancel/>}
                    label={"Cancel"}
                  labelPosition="before"
                  containerElement="label"
                >
                <input type="submit" style={styles.uploadInput}/>
    </FlatButton>
            
            </form>
                </ListItem>
                );
                
                
            }
            
            }
          )
          
      }
      
   
      </List>
      
       
      </div>

        );
    }
}

ScavengerHunt.contextTypes = {
    userInfo: PropTypes.object,
};

export default ScavengerHunt;