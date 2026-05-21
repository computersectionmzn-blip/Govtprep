import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADxRUKYSgq5sj711FyTM5UO2gZARv3qWU",
  authDomain: "govtprep-832b5.firebaseapp.com",
  projectId: "govtprep-832b5",
  storageBucket: "govtprep-832b5.firebasestorage.app",
  messagingSenderId: "885947513496",
  appId: "1:885947513496:web:89a4ca19625eea59d4aeed",
  measurementId: "G-88T1ER7CL3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
