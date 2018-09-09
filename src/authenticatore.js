import React from 'react';
import firebase from "firebase";
import PropTypes from 'prop-types';
import AuthUserContext from './AuthUserContext';

const Authenticator =  (Component) => {
  class Authenticator extends React.Component {
      
      constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      userInfo:{name:"", team:""}
    };
  }
  
  getChildContext() {
      return {
        authUser: this.state.authUser,
        userInfo: this.state.userInfo
      };
    }
    
    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        if(authUser){ 
          
          this.setState(() => ({ authUser }))
          firebase.database().ref("users/"+authUser.uid).once("value").then((snapshot)=>{
            
            const userInfo = snapshot.val();
 
  //this.setState({user})
   return userInfo
  
    }).then(userInfo=>{
    this.setState({userInfo})})
            
          }
          
          
        
        
          else{ 
            this.setState(() => ({ authUser: null}))};
      });
    }  
    
      
      
    render() {
        const { authUser, userInfo } = this.state;

      return (
        <AuthUserContext.Provider value={{authUser,userInfo}}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }
  

  return Authenticator

  
}

export default Authenticator;