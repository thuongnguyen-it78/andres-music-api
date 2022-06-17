import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDGZ11Dm3FE15WQTcm48GW9OwROGNDDbDA',
  authDomain: 'andres-music.firebaseapp.com',
  databaseURL: 'https://andres-music-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'andres-music',
  storageBucket: 'andres-music.appspot.com',
  messagingSenderId: '740089781335',
  appId: '1:740089781335:web:0c2325e94663eaf26e5712',
  measurementId: 'G-VYE4Z8J66C',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);