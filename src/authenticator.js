import React from 'react';
import firebase from "firebase";
import PropTypes from 'prop-types';

const Authenticator =  (Component) => {
  class Authenticator extends React.Component {
      
      constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      userInfo:{name:"", team:""}
    };
    
    this.createUser = this.createUser.bind(this)
    
  }
  
  getChildContext() {
      return {
        authUser: this.state.authUser,
        userInfo: this.state.userInfo
      };
    }
    
     createUser(id, name){
    
 const ref = firebase.database().ref(`users/${id}`);
 
 const data = ref.once("value").then((snapshot)=>{
     console.log(snapshot)
   return snapshot.exists()
  }).then((res)=>{
      console.log("decis")
      if(res){
          return ref.once("value").then(snapshot=>{
              console.log(snapshot)
              return snapshot.val()
          })
      }
      
      else {
          console.log(res, "setting")
          return ref.set({name}).then(()=>{
              console.log( "Set propper")
             return ref.once("value").then(snapshot=>{
                 console.log(snapshot.val())
                 return snapshot.val();
             })
          })
          
      }
      
      
      
  }).then((userInfo)=>{
      return userInfo;
  })
  
data.then(data=>{
    console.log(data)
})
  return data;
  
  
 
  
  
  
}
    
    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        if(authUser){ 
          console.log(authUser)
         // this.setState(() => ({ authUser }))
         
         this.createUser(authUser.uid, authUser.displayName).then(userInfo=>{
               this.setState(()=>({userInfo, authUser}))
         })
       
            
          }
          
          
        
        
          else{ 
            this.setState(() => ({ authUser: null}))};
      });
    }  
    
      
      
    render() {
      
      return (
          <Component />
      );
    }
  }
  
  
   Authenticator.childContextTypes = {
    authUser: PropTypes.object,
    userInfo: PropTypes.object
  };
  
  return Authenticator

  
}

export default Authenticator;