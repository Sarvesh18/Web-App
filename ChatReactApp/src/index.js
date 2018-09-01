import React from "react";
import ReactDOM from "react-dom";
import LoadableDashboard from "./jsx/LoadableDashboard.jsx";


import {BrowserRouter} from "react-router-dom";
import {firebaseApp} from './config/firebase.js';
//import {createBrowserHistory} from 'history';

//const history = createBrowserHistory();

/*
firebaseApp.auth().onAuthStateChanged (user=>{
  if(user) {
    console.log('user',user.email);
    history.push('/');
  }
  else {
    console.log('!user');
    history.replace('/signin');
  }
})
*/
ReactDOM.render (

  //<Router history={history} >
  <BrowserRouter>
      <LoadableDashboard />
  </BrowserRouter>

  ,document.getElementById("root")
);
