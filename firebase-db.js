import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Initialize new user with starting balance
async function initializeUserData(user) {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        balance: 1000  // Starting balance
      });
      console.log('New user profile created');
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
}

// Get user's balance
async function getUserBalance(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data().balance;
    }
    return null;
  } catch (error) {
    console.error('Error getting user balance:', error);
  }
}

// Update user's balance
async function updateUserBalance(userId, newBalance) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      balance: newBalance
    });
    console.log('Balance updated successfully');
  } catch (error) {
    console.error('Error updating balance:', error);
  }
}

export {
  initializeUserData,
  getUserBalance,
  updateUserBalance
};