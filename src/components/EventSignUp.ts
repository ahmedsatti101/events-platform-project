import { dbClient } from "../Aws";
import { ConditionalCheckFailedException, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import DialogComponent from "./Dialog";
import React, { useState, createElement } from "react";

export default function EventSignUp(event_id: string) {
    const user = window.sessionStorage.getItem("username");
    const [showDialog, setShowDialog] = useState(false);
    const closeDialog = () => setShowDialog(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const element = createElement(DialogComponent);
    
    const userIsAttending = async () => {
        if (!user) return;

        const command = new UpdateItemCommand({
            Key: {
                eventId: {
                    S: event_id
                }
            },
            TableName: "events",
            ExpressionAttributeNames: {
                "#att": "attendees"
            },
            ExpressionAttributeValues: {
                ":ats": {
                    L: [ {S: user} ]
                },
                ":empty_list": {L: []},
                ":user": {S: user}
            },
            UpdateExpression: "SET #att = list_append(if_not_exists(#att, :empty_list), :ats)",
            ConditionExpression: "not contains(#att, :user)",
        });
        await dbClient.send(command);
    };

    if (!user) { 
        alert("Please create an account or sign into your account before signing up for this event");
    } else {
        userIsAttending()
             .then(() => {
                if (window.confirm(`Do you wish to sign up for this event as ${user}?`)) {
                    alert("Thank you for signing up");
                }
             })
             .catch(e => {
                 if (e instanceof ConditionalCheckFailedException) alert("You've already signed up for this event.");
                 else console.log(e);
             })
    }
};

