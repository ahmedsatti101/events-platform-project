import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleEvent.css";
import EventSignUp from "../EventSignUp";
import AddToCalendar from "../AddToCalendar";
import { dbClient } from "../../Aws";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import DialogComponent from "../Dialog";

export default function SingleEvent() {
  const { event_id } = useParams();
  const [event, setEvent] = useState<any[]>();
  const [showDialog, setShowDialog] = useState(true);
  const closeDialog = () => setShowDialog(false);

  useEffect(() => {
    if (event_id) {
      const fetchData = async () => {
        const input = {
          Key: {
            eventId: {
              S: event_id,
            },
          },
          TableName: "events",
        };
        const command = new GetItemCommand(input);
        const res = await dbClient.send(command);
        const data = [];

        data.push(res.Item);

        setEvent(data);
      };

      fetchData();
    }
  }, [event_id]);

  const copyUrl = () => {
    const copy = document.getElementById("mytooltip");
    const url = window.location.href;

    navigator.clipboard.writeText(url);

    if (copy) {
      copy.innerHTML = "Copied!";
    }
  };

  function outFunc() {
    const tooltip = document.getElementById("mytooltip");

    if (tooltip) {
      tooltip.innerHTML = "Copy to clipboard";
    }
  }

  return (
    <>
      {event?.map((e) => {
        return (
          <>
            <AddToCalendar
              description={e.description.S}
              location={e.location.S}
              title={e.title.S}
              start={e.startTime.S}
              end={e.endTime.S}
              date={e.date.S}
            />
            <br />
            <br />
            <h1>{e.title.S}</h1>
            <h2>Description</h2>
            <article id="event-description">{e.description.S}</article>

            <h3>Date</h3>
            <p>{e.date.S}</p>

            <h3>Time</h3>
            <p>{`${e.startTime.S} - ${e.endTime.S}`}</p>

            <h3>Where</h3>
            <p>{e.location.S}</p>

            <button
              id="sign-up-button"
              onClick={() => {
                event_id
                  ? EventSignUp(event_id)
                  : <DialogComponent open={showDialog} title="Error" content="Error signing up for event. Please try again later." close={closeDialog}/>;
              }}
            >
              Sign up
            </button>

            <div className="tooltip">
              <button
                onClick={copyUrl}
                onMouseOut={outFunc}
                id="copy-link-button"
              >
                <span className="tooltiptext" id="mytooltip">
                  Copy to clipboard
                </span>
                Copy link
              </button>
            </div>

            <p>
              For queries or issues you can send a message to {e.email.S} or
              phone {e.phoneNumber.S}
            </p>
          </>
        );
      })}
    </>
  );
}
