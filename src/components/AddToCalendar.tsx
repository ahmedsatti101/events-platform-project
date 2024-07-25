import React from "react";
import { google, CalendarEvent } from "calendar-link";

type Props = {
    description: string,
    location: string,
    title: string,
    start: {date: string},
    end: {date: string}
}

export default function AddToCalendar({description, location, title, start, end}: Props) {
  const event: CalendarEvent = {
    title,
    description,
    start: "2019-12-29",
    location,
    busy: true
  };

  return (
    <>
      <a href={google(event)} target="_blank"><button>Add to calendar</button></a>
    </>
  );
}
