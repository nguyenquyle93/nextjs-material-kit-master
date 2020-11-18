import firebase from 'firebase/app'
import { functions } from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAepYvU1BivlITK2fc32n1SQQTYzjRoV9E",
    authDomain: "material-kit-cec6e.firebaseapp.com",
    databaseURL: "https://material-kit-cec6e.firebaseio.com",
    projectId: "material-kit-cec6e",
    storageBucket: "material-kit-cec6e.appspot.com",
    messagingSenderId: "979964379147",
    appId: "1:979964379147:web:8572fc9d3056d0d371c70e",
    measurementId: "G-LVWW5NVD35"
};
  // Initialize Firebase

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
//  else{
//   firebaseConnect = firebase.initializeApp(firebaseConfig);
//  }

  export const connectData = firebase.database().ref('pages1');
  export const connectData2 = firebase.database().ref('pages2');
  export const connectData3 = firebase.database().ref('pages3');
  export const connectData4 = firebase.database().ref('pages4');
  export const connectData5 = firebase.database().ref('pages5');
  export const connectData6 = firebase.database().ref('pages6');
  export const connectData7 = firebase.database().ref('pages7');
  export const newPost = firebase.database().ref('newPost');