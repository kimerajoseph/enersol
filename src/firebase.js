import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

// apiKey: "AIzaSyBP0zWnDbv3uhgRAMEi0k_JqO9jWDV3AM0",
// authDomain: "enersol-26878.firebaseapp.com",
// projectId: "enersol-26878",
// storageBucket: "enersol-26878.appspot.com",
// messagingSenderId: "178084089452",
// appId: "1:178084089452:web:c04c6a11cff52e031bd249"

export const auth = app.auth()
export default app