import React, { useState } from "react";
import "./CreateEventForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { parse, isDate } from "date-fns";
import moment from "moment";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Title is a required field")
      .min(10, "Title must include at least 10 characters")
      .max(50, "Reached maximum character length"),
    description: yup
      .string()
      .required("Description is a required field")
      .min(20, "Description must include at least 20 characters")
      .max(500, "Reached maximum character length"),
    date: yup
      .date()
      .transform(function (value, originalValue) {
        const parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "yyyy-MM-dd", new Date().toString());
        return parsedDate;
      })
      .typeError("Please enter a valid date")
      .required()
      .min(
        moment().add(1, "days").startOf("day").toDate(),
        "Date must be in the future"
      ),
    startTime: yup
      .string()
      .length(5, "Time must match 24 hour time format")
      .matches(/(\d){2}:(\d){2}/)
      .required("Start time cannot be empty"),
    endTime: yup
      .string()
      .length(5, "Time must match 24 hour time format")
      .matches(/(\d){2}:(\d){2}/)
      .required("End time cannot be empty")
      .test("is-greater", "end time should be greater", function (value) {
        const { startTime } = this.parent;
        return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
      }),
    location: yup
      .string()
      .required("Please enter a location")
      .min(20, "Location must include at least 20 characters")
      .max(200, "Reached maximum character length"),
    phoneNumber: yup
      .string()
      .matches(
        /^(?:0|\+44)\s?\d{10}$/,
        "Enter valid phone number e.g. +447896345621 / 07896345621"
      ),
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
  })
  .required();

try {
  schema.validateSync({
    title: "Sample Title",
    description: "Sample Description for an event to be created",
    date: "2024-12-12",
    startTime: "10:00",
    endTime: "11:00",
    location: "This is a sample location the staff will enter or rather the length of it",
    phoneNumber: "+447625103347",
    email: "sample@example.com",
  });
} catch (err) {
  
}

type FormData = yup.InferType<typeof schema>;

export default function CreateEventForm() {
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    try {
      addDoc(collection(db, "events"), {
        title,
        date,
        location,
        description,
        startTime,
        endTime,
        phoneNumber,
        email,
      })
        .then(() => {
          alert("Event created");
        })
        .catch((err) => {
          alert("Error creating event. Try again later.");
        });
    } catch (error) {
      alert("Error creating event. Try again later.");
    }
  };

  return (
    <>
      <h2 id="create-event-form-title">Create event</h2>
      <p>Fields marked with an asterisk (*) are required</p>
      <section className="create-event-form">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="event-form"
      >
        <label htmlFor="title" data-testid="title-test">
          Title:*{" "}
        </label>
        <br />
        <input
          type="text"
          {...register("title")}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          data-testid="input-title"
        />
        <p id="error-text">{errors.title?.message}</p>
        <br />

        <label htmlFor="description">Description:* </label>
        <br />
        <input
          type="text"
          {...register("description")}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          data-testid="input-description"
        />
        <p id="error-text">{errors.description?.message}</p>
        <br />

        <label>Date:* </label>
        <br />
        <input
          type="text"
          {...register("date")}
          placeholder="yyyy-mm-dd"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          data-testid="input-date"
        />
        <p id="error-text">{errors.date?.message}</p>
        <br />

        <label htmlFor="start-time">Start time:* (24 hour format)</label>
        <br />
        <input
          type="text"
          {...register("startTime")}
          placeholder="06:00"
          id="start-time"
          onChange={(e) => setStartTime(e.target.value)}
          data-testid="input-start-time"
        />
        <p id="error-text">{errors.startTime?.message}</p>
        <br />

        <label htmlFor="end-time">End time:* (24 hour format)</label>
        <br />
        <input
          type="text"
          {...register("endTime")}
          placeholder="23:00"
          id="end-time"
          onChange={(e) => setEndTime(e.target.value)}
          data-testid="input-end-time"
        />
        <p id="error-text">{errors.endTime?.message}</p>
        <br />

        <label>Location:*</label>
        <br />
        <textarea
          {...register("location")}
          id="location"
          onChange={(e) => setLocation(e.target.value)}
          data-testid="input-location"
        ></textarea>
        <p id="error-text">{errors.location?.message}</p>
        <br />

        <label htmlFor="phone-number">Phone number:* </label>
        <br />
        <input
          type="text"
          {...register("phoneNumber")}
          id="phone-number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          data-testid="input-phone-number"
          placeholder="e.g. +447896345621"
        />
        <p id="error-text">{errors.phoneNumber?.message}</p>
        <br />

        <label htmlFor="email">Email:* </label>
        <br />
        <input
          type="text"
          {...register("email")}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          data-testid="input-email"
          placeholder="email@example.com"
        />
        <p id="error-text">{errors.email?.message}</p>
        <br />

        <footer>
          <button type="submit" id="save-event-button">Save</button>
        </footer>
      </form>
      </section>
    </>
  );
}
