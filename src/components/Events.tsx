import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ViewAllEvents() {
  const colRef = collection(db, "events");
  const [events, setEvents] = useState<any[]>();

  useEffect(() => {
    
  });

  console.log(events);

  return (
    <>
      {events?.map((event) => {
        return <h2 key={event.id}>{event.title}</h2>;
      })}
    </>
  );
}
