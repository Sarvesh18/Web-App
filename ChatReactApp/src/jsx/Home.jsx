import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../style/style.css';
import Chat from './Chat.jsx';
import {database,firebaseApp} from '../config/firebase.js';
import Profile from './Profile.jsx';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            chat: '',
            email:'',
            index: '',
            users: [],
            msgs: []
        }
        console.log('Home props',props);
    }
    componentDidMount() {
        console.log('DidMount');
        this.readUser();
    }
    signOut() {
        console.log('signout()',this.props);
        firebaseApp.auth().signOut();
        //this.props.history.push('/signout');
    }
    readUser() {
        console.log('readUser()');  
        const userRef=database.ref('/user/');
        userRef.on("value", snap => {
            let users=[];
            snap.forEach(user => {
                console.log(user.key,'key',user.val(),'val');
                users.push(user.val());
            });
            this.setState({users}); 
        }); 
    }

    readChat(user) {
        database.ref('/msgs/'+this.state.index+'/').off();
        this.setState({chat: user});

        let email = firebaseApp.auth().currentUser.email;
        let chat = user; 
        
        //email = email.replace('.','_');
        email = email.split('.').join('_');
        //chat = chat.replace('.','_');
        chat = chat.split('.').join('_');

        console.log('readChat()','email',email,'chat',chat);

        let n=email.localeCompare(chat);
        if(n!=0) {
            let index;
            if(n==-1)
            {
                index=chat+'&'+email;
                console.log('-1',n);
            }
            else if(n==1) {
                index=email+'&'+chat;
                console.log('1',n);
            }
            const msgRef=database.ref('/msgs/'+index+'/');
        
            let msgs=[];
            this.setState({msgs:msgs,index:index});
            msgRef.orderByKey().on("child_added", snap => { 
                snap.forEach(msg => {
                    console.log(msg.key,'key',msg.val().user,msg.val().send, msg.val().timestamp);
                    msgs.push({'user': msg.val().user, 'msg': msg.val().send,'time': msg.val().timestamp});
                }); 
                this.setState({msgs}); 
            });   
        }
        else 
        {
            let msgs=[];
            this.setState({msgs});
        }
    }

    render() {
        return (
            <div>
                {console.log('Home')}
                <Profile/>
                <div style={{clear: "both",float: 'right'}}>
                    <button type="button" className="btn btn-danger"
                        onClick={()=>this.signOut()}>Signout</button>
                </div>
                <div style={{clear:"both",
                            textAlign: "center",    
                            //backgroundColor:'black',
                            height: 400,
                            color:'black'
                            }}>
                    <div style={{float:'left',
                                width: '18%',}}>
                        <h3>Online</h3>
                        <div style={{height: 400,
                                    overflow: 'auto'}}>
                        {
                            this.state.users.length > 0 ? 
                                (this.state.users.map((user,key)=>{
                                    return(<div key={key}><button type="button" className="btn btn-default" onClick={()=>this.readChat(user)}>{user}</button></div>)       
                                })) 
                                : 
                                (<h4 style={{color: 'red'}}>Please Wait Loading!</h4>)
                        }
                        </div>
                    </div>
                    <Chat chat={this.state.chat} msgs={this.state.msgs}/>
                </div>
            </div>
        );
    }
}
    
export default Home;