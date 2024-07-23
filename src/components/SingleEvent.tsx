import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

export default function SingleEvent() {
  const { event_id } = useParams();
  const [event, setEvent] = useState<any[]>([]);

  useEffect(() => {
    if (event_id) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "events", event_id);
          const result = await getDoc(docRef);
          const data: any[] = [];

          data.push({ ...result.data(), id: result.id });

          setEvent(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [event_id]);

  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied")
  }

  return (
    <>
      {event.map((e) => {
        return (
          <>
            <h2>Description</h2>
            <article id="event-description">{e.description}</article>

            <h3>Date</h3>
            <p>{e.date}</p>

            <h3>Time</h3>
            <p>{`${e.startTime} - ${e.endTime}`}</p>

            <h3>Where</h3>
            <p>{e.location}</p>

            <Button variant="contained" id="sign-up-button">
              Sign up
            </Button>

            <button onClick={copyUrl}>Copy link</button>

            <p>
              For queries or issues you can send a message to {e.email} or
              phone {e.phoneNumber}
            </p>
          </>
        );
      })}
    </>
  );
}
