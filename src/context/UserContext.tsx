import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    if (loggedInUser) window.sessionStorage.setItem("user", loggedInUser);
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
