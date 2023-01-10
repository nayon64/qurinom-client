import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import app from '../../firebase/firebase.config';

const auth = getAuth(app)
export const AuthContext=createContext()

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

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = { user, logOut, signInWithProvider, createUser,updateUserProfile };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;