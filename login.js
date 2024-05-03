import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpobe0CLCA5qJILcPSJd0hIuKg1Dt9HIE",
  authDomain: "ai-legalease.firebaseapp.com",
  databaseURL: "https://ai-legalease-default-rtdb.firebaseio.com",
  projectId: "ai-legalease",
  storageBucket: "ai-legalease.appspot.com",
  messagingSenderId: "671784949113",
  appId: "1:671784949113:web:a75159f67e2d912577cba8",
  measurementId: "G-LT4DH1BGLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Wait for the DOM to be loaded
window.addEventListener("DOMContentLoaded", () => {
  // Email and password login
  const loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      window.location.href = "dash.html";
    } catch (error) {
      console.error("Login error:", error.message);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Incorrect Username or Password, Try Again!");
      } else {
        alert(error.message);
      }
    }
  });

  // Google login
  const googleLoginBtn = document.querySelector(".go");
  googleLoginBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      window.location.href = "dash.html";
    } catch (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
  });

  // Forgot Password
  const forgotPasswordLink = document.getElementById("forgotPassword");
  forgotPasswordLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = prompt("Enter your email address:");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
      } catch (error) {
        console.error("Password reset error:", error.message);
        alert(error.message);
      }
    }
  });
});