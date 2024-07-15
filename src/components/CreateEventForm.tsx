import React, { useState } from "react";
import "./CreateEventForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { parse, isDate } from "date-fns";
import moment from "moment";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
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
        "Date must be in the future",
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
    place: yup.string().required(),
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
        "invalid email address",
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
    place: "Sample Place",
    phoneNumber: "+447625103347",
    email: "sample@example.com",
  });
} catch (err) {
  console.log(err);
}

type FormData = yup.InferType<typeof schema>;

export default function CreateEventForm() {
  const [date, setDate] = useState(new Date().toString());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

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
        <input type="text" {...register("title")} />
        <p>{errors.title?.message}</p>
        <br />

        <label htmlFor="description">Description:* </label>
        <br />
        <input type="text" {...register("description")} />
        <p>{errors.description?.message}</p>
        <br />

        <label>Date:* </label>
        <br />
        <input type="text" {...register("date")} placeholder="dd-mm-yyyy" />
        <p>{errors.date?.message}</p> 
        <br />

        <label htmlFor="start-time">Start time:* (24 hour format)</label>
        <br />
        <input type="text" {...register("startTime")} placeholder="00:00" />
        <p>{errors.startTime?.message}</p>
        <br />

        <label htmlFor="end-time">End time:* (24 hour format)</label>
        <br />
        <input type="text" {...register("endTime")} placeholder="00:00" />
        <p>{errors.endTime?.message}</p>
        <br />

        <label>Place:*</label>
        <br />
        <textarea {...register("place")}></textarea>
        <p>{errors.place?.message}</p>
        <br />

        <label htmlFor="phone-number">Phone number: </label>
        <br />
        <input type="text" {...register("phoneNumber")} />
        <p>{errors.phoneNumber?.message}</p>
        <br />

        <label htmlFor="email">Email: </label>
        <br />
        <input type="text" {...register("email")} />
        <p>{errors.email?.message}</p>
        <br />

        <footer>
          <button type="submit">Save</button>
          <button>Cancel</button>
        </footer>
      </form>
    </>
  );
}
