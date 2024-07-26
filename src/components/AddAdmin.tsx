import React, { useState } from "react";
import { functions } from "../firebase";
import { httpsCallable } from "firebase/functions";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
    const addAdminRole = httpsCallable(functions, "addAdminRole");
    addAdminRole({ email })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
        />
        <p id="error-text">{errors.email?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
