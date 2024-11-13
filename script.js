let menu = document.querySelector("#menu-icon");
let nav = document.querySelector(".nav");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  nav.classList.toggle("active");
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAh391JmV8sMQMsG4GM-d5YYDW9B2Wm02Q",
  authDomain: "student-stake.firebaseapp.com",
  projectId: "student-stake",
  storageBucket: "student-stake.firebasestorage.app",
  messagingSenderId: "30261368491",
  appId: "1:30261368491:web:15cfe37fda0a38620489ee",
  measurementId: "G-D7WLWT2CFH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const login = document.getElementById("login");
const register = document.getElementById("register");

const userSignIn = async() => {
  signInWithPopup(auth, provider)
  .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      window.location.href = "dashboard/dashboard.html";
  }).catch((error) => {
      console.log(error.message);
    })
};
  
const userSignOut = async() => {
  signOut(auth).then(() => {
    console.log("User signed out");
  }).catch((error) => {
    console.log(error.message);
  })
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("User is signed out");
  }
});

login.addEventListener('click', userSignIn);
register.addEventListener('click', userSignOut);