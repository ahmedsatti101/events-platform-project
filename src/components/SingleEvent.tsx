import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

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

  return (
    <>
      {event.map((e) => {
        return <p>{e.title}</p>;
      })}
    </>
  );
}
