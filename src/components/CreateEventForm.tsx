import React, { useState } from "react";
import "./CreateEventForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEventForm() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <h2 id="create-event-form-title">Create event</h2>
      <form className="create-event-form" autoComplete="off">
        <label htmlFor="title" data-testid="title-test">
          Title:*{" "}
        </label>
        <br />
        <input type="text" name="title" required />
        <br />

        <label htmlFor="description">Description:* </label>
        <br />
        <input type="text" name="description" required />
        <br />

        <label>Date:* </label>
        <br />
        <DatePicker
          selected={date}
          onChange={(date) => date && setDate(date)}
        />
        <br />

        <label htmlFor="time">Time:*</label>
        <br />
        <input type="time" name="time" required />
        <br />

        <label>Place:*</label>
        <br />
        <textarea></textarea>
        <br />

        <label htmlFor="phone-number">Mobile: </label>
        <br />
        <input type="text" name="phone-number" />
        <br />

        <label htmlFor="email">Email: </label>
        <br />
        <input type="text" name="email" />
        <br />

        <footer>
          <button type="submit">Save</button>
          <button>Cancel</button>
        </footer>
      </form>
    </>
  );
}
