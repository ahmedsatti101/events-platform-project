import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const dbClient = new DynamoDBClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});

export const cognitoClient = new CognitoIdentityProviderClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});
