import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  // user Observer
  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      setLoading(false);
    });
    return () => unSuscribe();
  }, []);

  

  // global axions 
  const authAxios = axios.create({
    baseURL: "https://qurinom-server.vercel.app",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  // user log in by eamil and password
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // create user by email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user name and image url
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // provider login
  const signInWithProvider = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // user logout
  const logOut = () => {
    localStorage.removeItem("accessToken");
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    logOut,
    logIn,
    loading,
    signInWithProvider,
    createUser,
    updateUserProfile,
    authAxios,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
