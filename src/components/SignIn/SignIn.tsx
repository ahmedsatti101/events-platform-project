import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./SignIn.css";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email required"),
    password: yup.string().required("Password required"),
  })
  .required();

try {
  schema.validateSync({
    email: "test@email.com",
    password: "testpass",
  });
} catch (error) {
  
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
        alert("Logged in as: " + creds.user.email);
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          alert("Incorrect email or password");
        } else {
          alert("Could not sign you in. Try again later.")
        }
      });
  };

  return (
    <>
      <h2 id="sign-in-title">Sign in</h2>
      <section id="sign-in-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          data-testid="sign-in-form"
        >
          <label htmlFor="email" data-testid="email-test">
            Email:
          </label>
          <br />
          <input
            type="email"
            title="email"
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-email"
          />
          <p id="error-text">{errors.email?.message}</p>
          <br />

          <label htmlFor="password" data-testid="password-test">
            Password:
          </label>
          <input
            type="password"
            title="password"
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="input-password"
          />
          <p id="error-text">{errors.password?.message}</p>
          <br />

          <button type="submit" id="sign-in-button">Sign in</button>
        </form>
      </section>
    </>
  );
}
