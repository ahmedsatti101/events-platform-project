import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import "./SignIn.css";

type InitiateAuthCommandInput = "USER_PASSWORD_AUTH";

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
} catch (error) {}

type FormData = yup.InferType<typeof schema>;

const client = new CognitoIdentityProviderClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});

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

  const onSubmit = async () => {
    try {
        const input = {
          "AuthFlow": "USER_PASSWORD_AUTH" as InitiateAuthCommandInput,
          "AuthParameters": {
            "PASSWORD": password,
            "USERNAME": email
          },
          "ClientId": process.env.REACT_APP_COGNITO_CLIENT_ID ? process.env.REACT_APP_COGNITO_CLIENT_ID : ""
        }; 

        const command = new InitiateAuthCommand(input);
        const res = await client.send(command);
        console.log(res);
    }
    catch (e) {console.log(e)}
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

          <button type="submit" id="sign-in-button">
            Sign in
          </button>
        </form>
      </section>
    </>
  );
}
