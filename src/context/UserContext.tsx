import React, { createContext, useState, useEffect } from "react";

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

  return (
    <UserContext.Provider value={{ loggedInUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
