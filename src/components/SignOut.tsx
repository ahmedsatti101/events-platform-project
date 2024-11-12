import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import Button from "@mui/material/Button";
import { cognitoClient } from "../Aws";

export default function SignOut({ setIsSignedIn }: any) {
  const { setLoggedInUser } = useContext<any>(UserContext);
  const [showModal, setShowModal] = useState(false);
  const command = new GlobalSignOutCommand({ AccessToken: window.sessionStorage.getItem("accessToken") || "" });
  const response = async () => await cognitoClient.send(command);


  useEffect(() => {
    if (showModal) {
      setShowModal(false);
    }
  }, []);

  const handleSignOut = () => {
    response().then((data) => {
        if (data.$metadata.httpStatusCode === 200) {
            setIsSignedIn(false);
            setLoggedInUser({
                username: "",
                accessToken: ""
            });
            window.sessionStorage.clear();
            console.log("You signed out");
           if (window.location.href.endsWith("/create-event") || window.location.href.endsWith("/add-admin")) {
             window.location.href = "/";
            }
        }
    });
    
  };

  return (
    <>
      <Button onClick={handleSignOut} sx={{ my: 2, color: "white", display: "block" }}>Sign out</Button>
      {/*<Modal show={showModal}>
        <Modal.Header>Signed out</Modal.Header>
        <Modal.Body>You've signed out! Refresh to see changes.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>*/}
    </>
  );
}
