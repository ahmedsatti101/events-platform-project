import React from "react";
import { addEvent } from "./addToCalendar";

type Props = {
    description: string,
    location: string,
    creator: {email: string},
    title: string,
    start: {date: string},
    end: {date: string}
}

export default function AddToCalendar({description, location, creator, title, start, end}: Props) {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;

  const event = {
    description,
    location,
    creator: {email: creator.email},
    start: {date: "2024-07-25"},
    end: {date: "2024-07-25"},
    summary: title
  }

  return (
    <>
      <button onClick={() => {addEvent(calendarID, event)}}>Add to calendar</button>
    </>
  );
}
