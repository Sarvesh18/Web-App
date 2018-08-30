import React, {Component} from 'react';
import '../style/style.css';
import * as firebase from 'firebase'; 
import {database,firebaseApp} from '../config/firebase.js';
import moment from 'moment';

import '../style/style.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            send: '',
            error: ''
        }
        console.log('Chat props',props);
    }

    send() {
        let email = firebaseApp.auth().currentUser.email;
        let send = this.state.send;
        let chat = this.props.chat; 
        send=send.trim();
        //email = email.replace('.','_');
        email = email.split('.').join('_');
        //chat = chat.replace('.','_');
        chat = chat.split('.').join('_');
        //str.replace(/./g,'_');
        console.log('send()',email,send,chat);
        if(send!='')
        {
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
                const timestamp = new Date().getTime();
                const msgRef=database.ref('/msgs/'+index+'/'+timestamp);
                    
                msgRef
                .push({'timestamp': firebase.database.ServerValue.TIMESTAMP, 'user':email, 'send':send})
                .catch(error=> {
                    this.setState({error: error})
                });
            }
            else {
                alert('U Cannot Chat With Urself');
            }
        }
        document.getElementById('send').value="";
    }
    scroll() {
        document.getElementById('msg') ? (document.getElementById('msg').scrollTop=document.getElementById('msg').scrollHeight) : '';
        //window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop)
    }
    render() {
        return (
            <div>
                {console.log('Chat',this.props.chat,'Msgs',this.props.msgs)}
                {
                    this.props.chat ? (
                        <div style={{float:'right', 
                                    width:'78%'}}>
                            <h3>Chat with {this.props.chat}</h3>
                            <div id="msg" style={{height: 350,
                                    overflow: 'auto'}}>
                            {   
                                this.props.msgs.map((i,key)=>{
                                    console.log('i.user',i.user,' this.props.chat',this.props.chat);
                                    if(i.user.replace('_','.')===this.props.chat) {
                                        return (<div className="well well-sm" style={{textAlign:'left'}} key={key}>
                                                    <span>{moment(i.time).fromNow()}</span>
                                                    <br/>
                                                    <span>{i.msg}</span>
                                                </div>); 
                                    }
                                    else {
                                        return (<div className="well well-sm" style={{textAlign:'right'}} key={key}>
                                                    <span>{moment(i.time).fromNow()}</span>
                                                    <br/>
                                                    <span>{i.msg}</span>
                                                </div>);
                                    }
                                })  
                            }
                            {
                                this.scroll()
                            }
                            </div>

                            <br/>
                            <form className="form-inline">
                                <input type="text" id="send" placeholder="Enter Message" className="form-control"
                                    onKeyPress={event => {
                                        if(event.key==='Enter'){
                                            this.send();
                                            event.preventDefault();
                                        }
                                    }}
                                    onChange={event => this.setState({send: event.target.value})
                                }/>
                                <button type="button" className="btb btn-success form-control"
                                    onClick={() => this.send()}>Send</button>
                            </form>
                        </div>
                        ) : (<div style={{float:'right', 
                        width:'70%'}}><h3>Nothing to Show</h3></div>)
                }
                <br/>
            </div>
        );
    }
}
export default Chat;