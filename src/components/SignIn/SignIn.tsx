import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
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

export default function SignIn() {
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
    signInWithEmailAndPassword(auth, email, password)
        .then((creds) => {
            console.log("user logged in: ", creds.user)
        })
        .catch((err) => {
            console.log(err)
        })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h2>Sign in</h2>
      <label htmlFor="email">Email:</label>
      <input type="text" title="email" {...register("email")} onChange={(e) => setEmail(e.target.value)}/>
      <br />

      <label htmlFor="password">Password:</label>
      <input type="password" title="password" {...register("password")} onChange={(e) => setPassword(e.target.value)}/>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
}
