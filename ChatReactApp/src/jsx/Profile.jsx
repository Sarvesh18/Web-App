import React, {Component} from 'react';
import '../style/style.css';
import {database,firebaseApp} from '../config/firebase.js';
import icon from '../static/icon.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
        console.log('Profile props',props);
    }

    upload(event) {
        const file=event.target.files[0];
        console.log('upload()',file.name,' ',file.type);

        //const metadata = {
            //contentType: file.type,
        //};
        //const uploadTask = storageRef.child(`images/${file.name}`).put(file, metadata)
        
        /*
        storageRef.child('test')
            //`${file.name}`)
        .put(file)
        .then(snapshot=> snapshot.ref.getDownloadURL())
        .then(downloadURL=> {console.log('downloadURL',downloadURL)})
        .catch(error=> {
            this.setState({error: error})
        });
        */
    }
    
    download() {
        console.log('download()');
        /*
        storageRef.child('test').getDownloadURL()
        .then(downloadURL=> {
            //console.log('name',downloadTask.name);
            //console.log('fullPath',downloadTask.fullPath);
            //console.log('bucket',downloadTask.bucket);
            var img = document.getElementById('myimg');
            img.src = downloadURL;
        })
        .catch(error=> {
            this.setState({error: error})
        });
        */
    }

    render() {
        return (
            <div style={{float: 'right',marginRight:'10px'}}>
                {console.log('Profile')}
                <img src={icon} id="profile" alt="Profile" className="avatar"/>
                {/*
                <form className="form-inline" encType='multipart/form-data'>
                <input type="file" className='form-control'
                    onChange={event =>this.upload(event)
                }/>
                </form>
                <button type="button" className="btn btn-primary"
                    onClick={()=>this.download()}>Download</button>
                */}
                <div>{this.state.error.message}</div>
            </div>
        );
    }
}
export default Profile;