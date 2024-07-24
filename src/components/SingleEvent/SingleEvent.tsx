import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import "./SingleEvent.css";
import EventSignUp from "../EventSignUp";
import SignOut from "../SIgnOut";

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

            <button id="sign-up-button" onClick={() => {event_id ? EventSignUp(event_id): console.log("no event id")}}>Sign up</button>

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

            <SignOut />

            <p>
              For queries or issues you can send a message to {e.email} or phone{" "}
              {e.phoneNumber}
            </p>
          </>
        );
      })}
    </>
  );
}
