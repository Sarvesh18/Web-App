import React, { Component } from 'react';
import logo from '../static/logo.svg';
import style from '../style/style.css';

import Home from './Home.jsx';
import Signin from './Signin.jsx';
import Signout from './Signout.jsx';
import Signup from './Signup.jsx';

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import {firebaseApp} from '../config/firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      error: ''
    };
    console.log('constructor()');
  }
/*
  static getDerivedStateFromProps(props,state) {
    console.log('getDerivedStateFromProps()');
    console.log('props',props,'state',state);
    return null;
    //return {email: null};
  }
*/
  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount()');
  }
  componentDidMount() {
    console.log('componentDidMount()');
        
    firebaseApp.auth().onAuthStateChanged (user=>{
      if(user) {
        console.log('user',user.email);
        this.setState({email:user.email});
        //history.push('/');
      }
      else {
        console.log('!user');
        this.setState({email:''});
        //history.replace('/signin');

      }
    })
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log('UNSAFE_componentWillReceiveProps()',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate()',newProps,' ',newState);
    return true;
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('UNSAFE_componentWillUpdate()',nextProps,' ',nextState);
  }
/*
  getSnapshotBeforeUpdate(prevProps, prevState) { 
    console.log('getSnapshotBeforeUpdate()',prevProps,' ',prevState);
  }
*/
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate()',prevProps,' ',prevState);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()');
  }
  componentDidCatch() {
    console.log('componentDidCatch()');
  }
  forgotPassword() {
    console.log('forgotPassword()');
    /*
    var auth = firebaseApp.auth();
    var emailAddress = "sarvesh.singh@daffodilsw.com";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      console.log(error);
    });
    */
  }

  isUserLoggedIn() {
    //const user = firebaseApp.auth().currentUser;
    //this.setState({email:user});
    console.log('isUserLoggedIn()',this.state.email);
    if(this.state.email!='')
    {
      console.log('true',this.state.email);
      return true;
      //return <Signout />;
    }
    else if(this.state.email=='') {
      console.log('false',this.state.email);
      return false;
      //<div>
        //<Link to={'/signin'}>SignIn</Link><br/>
        //<Link to={'/signup'}>SignUp</Link>
      //</div>
    }
    else {
      return null;
    }
  }


  render() {
    {console.log('render()')}
    return (
      <div style={{width: '90%', margin: '0 auto'}}>
        {console.log('App')}
        <nav className="navbar navbar-inverse">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">ReactJSChatApp</a>
          </div>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              {
              //<li><Link to={"/"}>Home</Link></li>
              }
            </ul>
          </div>
        </nav>
        <div style={{textAlign: "center"}}>{this.state.email}</div>
        {
          /*
        <button type="button" className="btn btn-primary"
          onClick={()=>this.forgotPassword()}>Forgot Password</button>
          */
        }
        <Switch>
          {/*
          <Route exact path="/" render={() => <Home />}/>

          <Route exact path="/signin" render={() => <Signin />}/>

          <Route exact path="/signup" render={() => <Signup />}/>
          */
          }

          <Route exact path="/" render={() => (
            this.isUserLoggedIn() ? (
              <Home />
            ) : (
              <Redirect to="/signin" />
            )
          )}/>

          <Route exact path="/signin" render={() => (
            this.isUserLoggedIn() ? (
              <Redirect to="/" />
            ) : (
              <Signin />
            )
          )}/>

          <Route exact path="/signup" render={() => (
            this.isUserLoggedIn() ? (
              <Redirect to="/" />
            ) : (
              <Signup />
            )
          )}/>

          <Route exact path="/signout" render={() => (
            this.isUserLoggedIn() ? (
              <Redirect to="/" />
            ) : (
              <Signout />
            )
          )}/>
        </Switch>
        
        <div style={{clear: 'both',textAlign: "center",paddingTop: "50px"}}>
          <h3>&copy; 2018. All Rights Reserved!</h3>
        </div>
      </div>
    );
  }
}

export default App;
/*
get
  var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}



update
var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});




var user = firebase.auth().currentUser;

user.updateEmail("user@example.com").then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});

var user = firebase.auth().currentUser;
var newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});





verification email
var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});



pasword reset
var auth = firebase.auth();
var emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});

delete
var user = firebase.auth().currentUser;

user.delete().then(function() {
  // User deleted.
}).catch(function(error) {
  // An error happened.
});


re
var user = firebase.auth().currentUser;
var credential;

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
  // User re-authenticated.
}).catch(function(error) {
  // An error happened.
});
*/
