import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbklBUaJO7hzWXXHOelFyTwrL6UldqlAU",
  authDomain: "interviewiq-ai-b9028.firebaseapp.com",
  projectId: "interviewiq-ai-b9028",
  storageBucket: "interviewiq-ai-b9028.firebasestorage.app",
  messagingSenderId: "411030838604",
  appId: "1:411030838604:web:e1c2d4053b9a3902af43e9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);