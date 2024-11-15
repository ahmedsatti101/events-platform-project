import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import Button from "@mui/material/Button";
import { cognitoClient } from "../Aws";
import DialogComponent from "./Dialog";

export default function SignOut({ onSignOut }: {onSignOut: () => void}) {
  const { setLoggedInUser } = useContext<any>(UserContext);
  const [showDialog, setShowDialog] = useState(false);
  const command = new GlobalSignOutCommand({ AccessToken: window.sessionStorage.getItem("accessToken") || "" });
  const response = async () => await cognitoClient.send(command);
  const closeDialog = () => setShowDialog(false);
 
  const handleSignOut = () => {
    response().then((data) => {
        if (data.$metadata.httpStatusCode === 200) {
            setShowDialog(true);
            onSignOut();
            setLoggedInUser({
                username: "",
                accessToken: "",
                admin: ""
            });
            window.sessionStorage.clear();
           if (window.location.href.endsWith("/create-event") || window.location.href.endsWith("/add-admin")) {
             window.location.href = "/";
            }
        }
    });
    
  };

  return (
    <>
      <Button onClick={handleSignOut} sx={{ my: 2, color: "white", display: "block" }}>Sign out</Button>
      <DialogComponent open={showDialog} title="Signed out" content="You signed out of your account" close={closeDialog}/>
    </>
  );
}
