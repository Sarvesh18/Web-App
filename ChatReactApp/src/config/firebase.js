import * as firebase from 'firebase';

const config = {
};

export const firebaseApp = firebase.initializeApp(config);

export const storageRef = firebase.storage().ref();
export const database = firebase.database();
