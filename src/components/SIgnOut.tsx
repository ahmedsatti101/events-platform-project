import React from "react";
import { auth } from "../firebase";

export default function SignOut() {
  const signOut = async () => {
    await auth.signOut().then(() => {
      console.log("logged out");
    });
  };

  return (
    <>
      <button onClick={signOut}>Logout</button>
    </>
  );
}
