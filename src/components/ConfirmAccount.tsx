import React, { useState } from "react";
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});

export default function ConfirmAccount() {
    const [username, setUsername] = useState<string>("");
    const [code, setCode] = useState<string>("");

    const input = {
        ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
        Username: username,
        ConfirmationCode: code
    };
    const command = new ConfirmSignUpCommand(input);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const res = await client.send(command);
        console.log(res);
    };
    
    return (
        <form onSubmit={onSubmit}>
            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            <label>Confirmation code:</label>
            <input type="text" onChange={(e) => setCode(e.target.value)}/>
            <button type="submit">Confirm</button>
        </form>
    );
}
