import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASuEl2S63oZZ8PZCjgvhPhG5XBUbH3G2w",
  authDomain: "dinamed-29494.firebaseapp.com",
  projectId: "dinamed-29494",
  storageBucket: "dinamed-29494.appspot.com",
  messagingSenderId: "965459203131",
  appId: "1:965459203131:web:2c16e132a80923de50b81e"
};

// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export {
  firebase
};
