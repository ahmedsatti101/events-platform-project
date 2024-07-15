import React, { useState } from "react";
import "./CreateEventForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
       const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, "dd-MM-yyyy", new Date());
       return parsedDate;
      })
      .typeError("please enter a valid date")
      .required()
      .min("11-12-2003", "Date is too early"),
    startTime: yup.string().required("start time cannot be empty"),
    endTime: yup
      .string()
      .required("end time cannot be empty"),
    place: yup.string().required(),
    mobile: yup.string(),
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "invalid email address",
      ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function CreateEventForm() {
  const [date, setDate] = useState(new Date());
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
        <input type="text" {...register("date")} placeholder="dd-mm-yyyy"/>
        <p>{errors.date?.message}</p>
        {/*<DatePicker
          selected={date}
          onChange={(date) => date && setDate(date)}
        />*/}
        <br />

        <label htmlFor="start-time">Start time:*</label>
        <br />
        <input type="text"  {...register("startTime")} />
        <p>{errors.startTime?.message}</p>
        <br />

        <label htmlFor="end-time">End time:*</label>
        <br />
        <input type="text"  {...register("endTime")} />
        <p>{errors.endTime?.message}</p>
        <br />

        <label>Place:*</label>
        <br />
        <textarea {...register("place")}></textarea>
        <p>{errors.place?.message}</p>
        <br />

        <label htmlFor="phone-number">Mobile: </label>
        <br />
        <input type="text" {...register("mobile")} />
        <p>{errors.mobile?.message}</p>
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
