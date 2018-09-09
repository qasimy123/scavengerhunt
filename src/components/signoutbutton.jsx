import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import  firebase from 'firebase';



class SignOutButton extends Component {

signOut(){
    
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
   console.log("he");

}).catch(function(error) {
  console.log(error);
});
    
  }
  
  
 
  

render(){
    return(
        
         <RaisedButton style={this.props.style} onClick={this.signOut} label="Sign Out" />
        );
}
}

  
export default SignOutButton;