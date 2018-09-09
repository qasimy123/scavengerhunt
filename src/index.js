import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App";

import firebase from "firebase";


  const config = {
    apiKey: "AIzaSyCzxdA8uwa5DKymiJOHhnX_CPSGbNCRCxM",
    authDomain: "scavenger-hunt-53d39.firebaseapp.com",
    databaseURL: "https://scavenger-hunt-53d39.firebaseio.com",
    projectId: "scavenger-hunt-53d39",
    storageBucket: "scavenger-hunt-53d39.appspot.com",
    messagingSenderId: "326910544976"
  };
  
  if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

ReactDOM.render(
<App/>, document.getElementById('root'));
