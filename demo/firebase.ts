import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkPAxHrw1a1_LJ9KpBT9iTvYHZMVeNIBY",
  authDomain: "musa1336.firebaseapp.com",
  projectId: "musa1336",
  storageBucket: "musa1336.appspot.com",
  messagingSenderId: "45079661961",
  appId: "1:45079661961:web:3aa6cb97ac733c030c2558",
  measurementId: "G-NF4Y6WW3MB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
