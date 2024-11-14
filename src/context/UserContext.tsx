import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    accessToken: "",
    admin: ""
  });

  useEffect(() => {
    if (loggedInUser.username) {
        window.sessionStorage.setItem("username", loggedInUser.username);
        window.sessionStorage.setItem("admin", loggedInUser.admin !== "true" ? "false" : "true")
    }
  }, [loggedInUser.username]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
