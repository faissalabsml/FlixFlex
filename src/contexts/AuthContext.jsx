import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../utils/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function firebaseSignup(username, password) {
    return createUserWithEmailAndPassword(auth, username, password);
  }

  function firebaseLogin(username, password) {
    return signInWithEmailAndPassword(auth, username, password);
  }

  function firebaseLogout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, firebaseSignup, firebaseLogin, firebaseLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
