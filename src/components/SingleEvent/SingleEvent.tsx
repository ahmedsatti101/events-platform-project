import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import "./SingleEvent.css";
import EventSignUp from "../EventSignUp";
import AddToCalendar from "../AddToCalendar";

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
          alert("Could not display this event.");
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
            <AddToCalendar
              description={e.description}
              location={e.location}
              title={e.title}
              start={e.startTime}
              end={e.endTime}
              date={e.date}
            />
            <br />
            <br />
            <h1>{e.title}</h1>
            <h2>Description</h2>
            <article id="event-description">{e.description}</article>

            <h3>Date</h3>
            <p>{e.date}</p>

            <h3>Time</h3>
            <p>{`${e.startTime} - ${e.endTime}`}</p>

            <h3>Where</h3>
            <p>{e.location}</p>

            <button
              id="sign-up-button"
              onClick={() => {
                event_id ? EventSignUp(event_id) : alert("Something went wrong");
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
              For queries or issues you can send a message to {e.email} or phone{" "}
              {e.phoneNumber}
            </p>
          </>
        );
      })}
    </>
  );
}
