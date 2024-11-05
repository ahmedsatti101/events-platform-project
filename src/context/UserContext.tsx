import React, { createContext, useState, useEffect } from "react";
//import { auth } from "../firebase";

export const UserContext = createContext({
    loggedInUser: null,
    isAdmin: false
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const authListener = () => {
  //     const unsub = auth.onAuthStateChanged((user: any) => {
  //       if (user) {
  //         user.getIdTokenResult().then((tokenResult: any) => {
  //           user.admin = tokenResult.claims.admin;
  //           setIsAdmin(user.admin ? true : false);
  //         });
  //         setLoggedInUser(user);
  //       } else {
  //           setIsAdmin(false)
  //           setLoggedInUser(null)
  //       }
  //     });
  //     return () => unsub();
  //   };
  //   return authListener();
  // }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
