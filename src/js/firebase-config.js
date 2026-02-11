import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCOS8nsJZkek9KSght5drje219-__gIlmU",
    authDomain: "dashboard-28850.firebaseapp.com",
    projectId: "dashboard-28850",
    storageBucket: "dashboard-28850.firebasestorage.app",
    messagingSenderId: "1066216749346",
    appId: "1:1066216749346:web:9c5ba92aece513bc954d7b",
    measurementId: "G-Q51H1DSEWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
// const analytics = getAnalytics(app);