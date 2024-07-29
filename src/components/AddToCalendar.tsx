import React from "react";
import { google, CalendarEvent } from "calendar-link";
import EventIcon from '@mui/icons-material/Event';

type Props = {
    description: string,
    location: string,
    title: string,
    start: string,
    end: string,
    date: string
}

export default function AddToCalendar({description, location, title, start, end, date}: Props) {
  const event: CalendarEvent = {
    title,
    description,
    start: `${date} ${start}`,
    end: `${date} ${end}`,
    location,
    busy: true
  };

  return (
    <>
      <a href={google(event)} target="_blank" id="add-to-calendar-link">Add to calendar</a>
    </>
  );
}
