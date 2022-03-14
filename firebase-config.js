// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOCnGd4onROM4wLzsCWgXSh-2mrawQ9ME",
  authDomain: "functionals-7951c.firebaseapp.com",
  projectId: "functionals-7951c",
  storageBucket: "functionals-7951c.appspot.com",
  messagingSenderId: "819606985387",
  appId: "1:819606985387:web:081216ebc681ce60d5b5ee"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const fireStore = firebase.firestore();
const auth = firebase.auth();
export {fireStore, auth};