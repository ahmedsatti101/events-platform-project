import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    accessToken: ""
  });

  useEffect(() => {
    if (loggedInUser.username) {
        window.sessionStorage.setItem("username", loggedInUser.username);
    }
  }, [loggedInUser.username]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
