import React from "react";
import { auth } from "../firebase";

export default function SignOut() {
  const signOut = async () => {
    await auth.signOut().then(() => {
      alert("Logged out");
    });
  };

  return (
    <>
      <button onClick={signOut}>Logout</button>
    </>
  );
}
