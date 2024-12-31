let menu = document.querySelector("#menu-icon");
let nav = document.querySelector(".nav");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  nav.classList.toggle("active");
};

let navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
  link.onclick = () => {
    menu.classList.remove("bx-x");
    nav.classList.remove("active");
  };
});


import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getUserBalance } from '../firebase-db.js';


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
const auth = getAuth();


document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = '../index.html';
    } else {
      console.log('Logged in user:', user.email);
      
      // Get and display user's balance
      const balance = await getUserBalance(user.uid);
      const statsSection = document.querySelector('.stats');
      if (statsSection) {
        statsSection.innerHTML = `<h2>Balance: ${balance} coins</h2>`;
      }
    }
  });
});

const signOut = document.getElementById('logout');

signOut.addEventListener('click', async () => {
  await auth.signOut();
  window.location.href = "../index.html";
  console.log('User signed out')
});