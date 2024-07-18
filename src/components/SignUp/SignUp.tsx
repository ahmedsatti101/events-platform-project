import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters long")
      .required("Password required"),
  })
  .required();

try {
  schema.validateSync({
    email: "test@email.com",
    password: "testpass",
  });
} catch (error) {
  console.log(error);
}

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((creds) => {
          console.log(creds.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h2>Create account</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        title="email"
        {...register("email")}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        title="password"
        {...register("password")}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">Sign up</button>
    </form>
  );
}
