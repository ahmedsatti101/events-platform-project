import React, { useState } from "react";
import "./CreateEventForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { parse, isDate } from "date-fns";
import moment from "moment";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const schema = yup
  .object({
    title: yup.string().required().min(10, "Title must include at least 10 characters").max(50, "Reached maximum character length"),
    description: yup.string().required().min(20, "Description must include at least 20 characters").max(200, "Reached maximum character length"),
    date: yup
      .date()
      .transform(function (value, originalValue) {
        const parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "dd-MM-yyyy", new Date().toString());
        return parsedDate;
      })
      .typeError("please enter a valid date")
      .required()
      .min(
        moment().add(1, "days").startOf("day").toDate(),
        "Date must be in the future"
      ),
    startTime: yup
      .string()
      .length(5)
      .matches(/(\d){2}:(\d){2}/, "Time must be in this format 00:00")
      .required("start time cannot be empty"),
    endTime: yup
      .string()
      .length(5)
      .matches(/(\d){2}:(\d){2}/, "Time must be in this format 00:00")
      .required("end time cannot be empty")
      .test("is-greater", "end time should be greater", function (value) {
        const { startTime } = this.parent;
        return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
      }),
    location: yup.string().required().min(20, "Location must include at least 20 characters").max(200, "Reached maximum character length"),
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
        "invalid email address"
      ),
  })
  .required();

try {
  schema.validateSync({
    title: "Sample Title",
    description: "Sample Description",
    date: "12-12-2024",
    startTime: "10:00",
    endTime: "11:00",
    location: "Sample location",
    phoneNumber: "+447625103347",
    email: "sample@example.com",
  });
} catch (err) {
  alert(err);
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
        email
      })
        .then(() => {
          alert("data submitted!");
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h2 id="create-event-form-title">Create event</h2>
      <p>Field marked with an asterisk (*) are required</p>
      <form
        className="create-event-form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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
        />
        <p>{errors.title?.message}</p>
        <br />

        <label htmlFor="description">Description:* </label>
        <br />
        <input
          type="text"
          {...register("description")}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>{errors.description?.message}</p>
        <br />

        <label>Date:* </label>
        <br />
        <input
          type="text"
          {...register("date")}
          placeholder="dd-mm-yyyy"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <p>{errors.date?.message}</p>
        <br />

        <label htmlFor="start-time">Start time:* (24 hour format)</label>
        <br />
        <input
          type="text"
          {...register("startTime")}
          placeholder="00:00"
          id="start-time"
          onChange={(e) => setStartTime(e.target.value)}
        />
        <p>{errors.startTime?.message}</p>
        <br />

        <label htmlFor="end-time">End time:* (24 hour format)</label>
        <br />
        <input
          type="text"
          {...register("endTime")}
          placeholder="00:00"
          id="end-time"
          onChange={(e) => setEndTime(e.target.value)}
        />
        <p>{errors.endTime?.message}</p>
        <br />

        <label>Location:*</label>
        <br />
        <textarea {...register("location")} id="location" onChange={(e) => setLocation(e.target.value)}></textarea>
        <p>{errors.location?.message}</p>
        <br />

        <label htmlFor="phone-number">Phone number: </label>
        <br />
        <input type="text" {...register("phoneNumber")} id="phone-number" onChange={(e) => setPhoneNumber(e.target.value)}/>
        <p>{errors.phoneNumber?.message}</p>
        <br />

        <label htmlFor="email">Email: </label>
        <br />
        <input type="text" {...register("email")} id="email" onChange={(e) => setEmail(e.target.value)}/>
        <p>{errors.email?.message}</p>
        <br />

        <footer>
          <button type="submit">Save</button>
          {/* <button>Cancel</button> */}
        </footer>
      </form>
    </>
  );
}
