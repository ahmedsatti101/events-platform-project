import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CognitoIdentityProviderClient, SignUpCommand, UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import "./SignUp.css";

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
      .min(8, "Password must be at least 8 characters long")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character (e.g., @, #, !)") 
      .required("Password required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const client = new CognitoIdentityProviderClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});

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

  const onSubmit = async () => {
    try {
        const input = {
            ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ? process.env.REACT_APP_COGNITO_CLIENT_ID : "",
            Username: email,
            Password: password
        };

        const command = new SignUpCommand(input);
        await client.send(command)
            .then((data) => {
                if (data.$metadata.httpStatusCode == 200) {
                    alert("Account created");
                }
            })
    }
    catch (e) {
        if (e instanceof UsernameExistsException) {
            alert("You already have an account")
        }
        else {
            alert("Could not create account. Try again later");
        } 
    }
  };

  return (
    <>
      <h2 id="sign-up-title">Create an account</h2>
      <section id="sign-up-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          data-testid="sign-up-form"
        >
          <label htmlFor="email" data-testid="email-test" id="sign-up-email">
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
          <br />
          <input
            type="password"
            title="password"
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="input-password"
          />
          <p id="error-text">{errors.password?.message}</p>
          
          <p>Password requirements:</p>
          <ul>
            <li>Must be at least 8 characters long</li>
            <li>Contains at least 1 number</li>
            <li>Contains at least 1 special character</li>
            <li>Contains at least 1 uppercase letter</li>
            <li>Contains at least 1 lowercase letter</li>
          </ul>

          <br />

          <button type="submit" id="sign-up-button">
            Sign up
          </button>
          <p id="user-already-exists">
            Already have an account? <a href="/sign-in"> Sign in</a>
          </p>
        </form>
      </section>
    </>
  );
}
