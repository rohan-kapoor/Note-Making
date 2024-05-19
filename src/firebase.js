import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBoFFsqLUb5Cv7mE4OtsN0tBEOJKxRG86c",
    authDomain: "notes-app-66d2d.firebaseapp.com",
    projectId: "notes-app-66d2d",
    storageBucket: "notes-app-66d2d.appspot.com",
    messagingSenderId: "780091855012",
    appId: "1:780091855012:web:36de4e81fb4b07b6131631",
    databaseURL: 'https://notes-app-66d2d-default-rtdb.firebaseio.com/',
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, app, auth};
