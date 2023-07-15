import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/index";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Created Auth context to used throughout the application
const AuthContext = createContext();

// function that returns auth context values
export const useAuth = () => useContext(AuthContext);

// Login with email and password
const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

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
  });

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
