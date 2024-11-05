import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddAdmin.css";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function AddAdmin() {
  const [email, setEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          title="email"
          {...register("email")}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="admin-email-input"
        />
        <p id="error-text">{errors.email?.message}</p>
        <button type="submit" id="add-admin-button">
          Submit
        </button>
      </form>
    </>
  );
}
