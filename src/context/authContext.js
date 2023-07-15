import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/index";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";

// Created Auth context to used throughout the application
const AuthContext = createContext();

// function that returns auth context values
export const useAuth = () => useContext(AuthContext);

// Sign Up with email and password
const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login User
const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Logout User
const logout = () => signOut(auth);

//forgotPassword
const resetPassword = (email, newPassword) =>
  updatePassword(email, newPassword);

// Auth Provider
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  // Exectue on page initial load
  useEffect(() => {
    // set the current user // firebase inbuilt on authStateChange returns a function to unsubscribe
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );

    // unsubscribe current user
    return () => unsubscribe();
  }, []);

  // update User
  const updateEmail = (email) => updateEmail(currentUser, email);

  // Update Password
  const updatePassword = (password) => updatePassword(currentUser, password);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
